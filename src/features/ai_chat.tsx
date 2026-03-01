// #region library
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { F_Send_Ai_Message } from '../services/gemini_api_service';
import { F_Get_Usage, F_Update_Usage, F_Save_Chat_History, F_Load_Chat_History, F_Clear_Chat_Db } from '../services/indexed_db_service';
import { Send, Trash2, AlertCircle, MoreVertical, LogOut, Clock } from 'lucide-react';
// #endregion

// #region global variable
const MAX_DAILY_LIMIT = 5;
// #endregion

// #region subcomponents
const F_Typewriter = ({ p_text }: { p_text: string }) => {
    const [displayed, set_displayed] = useState("");
    const [is_done, set_is_done] = useState(false);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            set_displayed(p_text.slice(0, i + 1));
            i++;
            if (i >= p_text.length) {
                clearInterval(interval);
                set_is_done(true);
            }
        }, 15);
        return () => clearInterval(interval);
    }, [p_text]);

    return (
        <ReactMarkdown
            components={{
                a: ({ node, ...props }) => <a target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors" {...props} />
            }}
        >
            {displayed + (is_done ? "" : " ▍")}
        </ReactMarkdown>
    );
};
// #endregion

// #region functions
// AI Chat Feature Component.
export const F_Ai_Chat = ({ p_persona, p_full_name, on_close }: { p_persona: string, p_full_name: string, on_close?: () => void }) => {
    // #region local variables
    const [messages, set_messages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
    const [input, set_input] = useState('');
    const [remaining_questions, set_remaining_questions] = useState(MAX_DAILY_LIMIT);
    const [is_loading, set_is_loading] = useState(false);
    const [show_clear_modal, set_show_clear_modal] = useState(false);
    const [show_menu, set_show_menu] = useState(false);
    const [time_until_reset, set_time_until_reset] = useState('');
    const [reset_timestamp, set_reset_timestamp] = useState(0);
    const scroll_ref = useRef<HTMLDivElement>(null);
    const menu_ref = useRef<HTMLDivElement>(null);
    // #endregion

    // #region functions
    useEffect(() => {
        F_Check_Limit();
        F_Init_Chat();

        const handle_click_outside = (e: MouseEvent) => {
            if (menu_ref.current && !menu_ref.current.contains(e.target as Node)) {
                set_show_menu(false);
            }
        };
        document.addEventListener('mousedown', handle_click_outside);
        return () => document.removeEventListener('mousedown', handle_click_outside);
    }, []);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        if (remaining_questions <= 0 && reset_timestamp > 0) {
            const calculate_time = () => {
                const now = Date.now();
                const diff = reset_timestamp - now;

                if (diff <= 0) {
                    F_Check_Limit(); // Force refresh limit when time is up
                    return;
                }

                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                set_time_until_reset(
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                );
            };

            calculate_time();
            timer = setInterval(calculate_time, 1000);
        }
        return () => clearInterval(timer);
    }, [remaining_questions, reset_timestamp]);

    useEffect(() => {
        if (scroll_ref.current) {
            scroll_ref.current.scrollTop = scroll_ref.current.scrollHeight;
        }
    }, [messages, is_loading]);

    const F_Init_Chat = async () => {
        const history = await F_Load_Chat_History();
        if (history && history.length > 0) {
            set_messages(history);
        }
    };

    const F_Check_Limit = async () => {
        const usage = await F_Get_Usage();

        if (!usage) {
            set_remaining_questions(MAX_DAILY_LIMIT);
            set_reset_timestamp(0);
            return;
        }

        const now = Date.now();
        if (now > usage.reset_at) {
            // Limits expired naturally
            set_remaining_questions(MAX_DAILY_LIMIT);
            set_reset_timestamp(0);
            await F_Update_Usage(0, 0); // Clear limits entirely instead of inserting fake numbers
        } else {
            // Still within the 24 hour block
            set_remaining_questions(MAX_DAILY_LIMIT - usage.count);
            set_reset_timestamp(usage.reset_at);
        }
    };

    const F_Handle_Send = async () => {
        if (!input.trim() || remaining_questions <= 0 || is_loading) return;

        const user_msg = input.trim();
        set_input('');

        const new_messages = [...messages, { role: 'user' as const, content: user_msg }];
        set_messages(new_messages);
        await F_Save_Chat_History(new_messages);
        set_is_loading(true);

        try {
            const ai_response = await F_Send_Ai_Message(user_msg, p_persona, new_messages);

            const final_messages = [...new_messages, { role: 'ai' as const, content: ai_response }];
            set_messages(final_messages);
            await F_Save_Chat_History(final_messages);

            const usage = await F_Get_Usage();
            const current_count = usage ? usage.count : 0;
            const new_count = current_count + 1;

            // If it's the very first question, we start the 24 hour timer now.
            // Otherwise we keep the existing reset_at timer.
            const new_reset_at = (current_count === 0 || !usage?.reset_at)
                ? Date.now() + (24 * 60 * 60 * 1000)
                : usage.reset_at;

            await F_Update_Usage(new_count, new_reset_at);
            set_remaining_questions(MAX_DAILY_LIMIT - new_count);
            set_reset_timestamp(new_reset_at);
        } catch (error) {
            console.error(error);
            const err_messages = [...new_messages, { role: 'ai' as const, content: `I am bussy right now please contact real ${p_full_name}` }];
            set_messages(err_messages);
            await F_Save_Chat_History(err_messages);
        } finally {
            set_is_loading(false);
        }
    };

    const F_Clear_Chat = async () => {
        set_messages([]);
        await F_Clear_Chat_Db();
        set_show_clear_modal(false);
    };
    // #endregion

    const is_active = remaining_questions > 0;

    return (
        <div className="flex flex-col h-full bg-[#0d0d0d] rounded-[32px] overflow-hidden relative">
            <div className="p-4 sm:p-5 bg-[#111] border-b border-[#222] flex justify-between items-center px-6 z-10 w-full shrink-0 relative">
                <div className="flex items-center gap-3 overflow-hidden">
                    <button
                        onClick={on_close}
                        className="relative group transition-transform active:scale-95"
                        title={on_close ? "Return to Card" : "Profile"}
                    >
                        <img src="/avatar.jpg" alt="AI Avatar" className="w-10 h-10 rounded-full object-cover border border-[#333] shadow-lg shrink-0" />
                        {on_close && (
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity md:hidden">
                                <LogOut size={14} className="text-white ml-0.5" />
                            </div>
                        )}
                    </button>
                    <div className="flex flex-col min-w-0">
                        <span className="text-[12px] sm:text-[13px] font-bold text-zinc-200 truncate">{p_full_name} AI</span>
                        <div className="flex items-center gap-1.5 mt-0.5 shrink-0">
                            <div className={`w-1.5 h-1.5 rounded-full ${is_active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`}></div>
                            <span className={`text-[9px] uppercase tracking-widest font-bold truncate ${is_active ? 'text-emerald-500/80' : 'text-rose-500/80'}`}>
                                Neural Link {is_active ? 'Active' : 'Passive'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Desktop controls */}
                <div className="hidden md:flex items-center gap-3 shrink-0 ml-2">
                    <span className="text-[11px] font-bold text-zinc-500">{remaining_questions} / {MAX_DAILY_LIMIT}</span>
                    {messages.length > 0 && (
                        <button
                            onClick={() => set_show_clear_modal(true)}
                            className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/20 shrink-0"
                            title="Clear Chat"
                        >
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>

                {/* Mobile Dropdown controls */}
                <div className="md:hidden relative" ref={menu_ref}>
                    <button
                        onClick={() => set_show_menu(!show_menu)}
                        className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#222] rounded-lg transition-colors border border-transparent hover:border-[#333]"
                    >
                        <MoreVertical size={18} />
                    </button>

                    {show_menu && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-xl overflow-hidden py-1 z-50 animate-in fade-in slide-in-from-top-2">
                            <div className="px-4 py-2 border-b border-[#333] mb-1 group px-3">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Remaining Limits</span>
                                <span className="text-xs font-bold text-zinc-200">{remaining_questions} / {MAX_DAILY_LIMIT} requests</span>
                            </div>
                            {remaining_questions <= 0 && (
                                <div className="px-4 py-2 border-b border-[#333] mb-1 bg-rose-500/5">
                                    <span className="text-[10px] font-bold text-rose-500/80 uppercase tracking-wider block">Resets In</span>
                                    <div className="flex items-center gap-1.5 text-rose-400 mt-0.5">
                                        <Clock size={12} />
                                        <span className="text-xs font-mono font-bold">{time_until_reset}</span>
                                    </div>
                                </div>
                            )}
                            {on_close && (
                                <button
                                    onClick={() => { on_close(); set_show_menu(false); }}
                                    className="w-full text-left px-4 py-2.5 text-xs text-zinc-300 hover:bg-[#2a2a2a] hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <LogOut size={14} />
                                    Return to Card
                                </button>
                            )}
                            {messages.length > 0 && (
                                <button
                                    onClick={() => { set_show_clear_modal(true); set_show_menu(false); }}
                                    className="w-full text-left px-4 py-2.5 text-xs text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-2"
                                >
                                    <Trash2 size={14} />
                                    Clear Chat
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div ref={scroll_ref} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar relative z-0">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center opacity-30 text-center px-8">
                        <div className="w-12 h-12 rounded-full border border-dashed border-zinc-600 mb-4 flex items-center justify-center">
                            <div className="w-6 h-6 opacity-40 bg-zinc-500 rounded-full"></div>
                        </div>
                        <p className="text-xs font-medium text-zinc-400 italic tracking-wide">Initialize persona core to begin chatting...</p>
                    </div>
                )}
                {messages.map((m, i) => {
                    const is_last_ai = m.role === 'ai' && i === messages.length - 1;
                    return (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] sm:text-sm leading-relaxed ${m.role === 'user'
                                ? 'bg-[#222] text-zinc-200 font-medium rounded-tr-none border border-[#333]'
                                : 'bg-[#111] text-zinc-300 border border-[#222] rounded-tl-none shadow-md prose prose-invert prose-p:leading-relaxed prose-pre:bg-[#0a0a0a]'
                                }`}>
                                {m.role === 'ai' ? (
                                    is_last_ai ? <F_Typewriter p_text={m.content} /> :
                                        <ReactMarkdown
                                            components={{
                                                a: ({ node, ...props }) => <a target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors" {...props} />
                                            }}
                                        >
                                            {m.content}
                                        </ReactMarkdown>
                                ) : m.content}
                            </div>
                        </div>
                    );
                })}
                {is_loading && (
                    <div className="flex justify-start">
                        <div className="bg-[#111] py-3.5 px-5 rounded-3xl rounded-tl-none flex items-center gap-3 border border-[#222] shadow-md">
                            <span className="text-xs text-zinc-500 font-medium italic tracking-wide">{p_full_name} is typing...</span>
                            <div className="flex gap-1.5 opacity-50">
                                <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></div>
                                <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 sm:p-5 bg-[#0a0a0a] border-t border-[#222] z-10 shrink-0">
                <div className="flex justify-between items-center mb-1.5 px-2">
                    <div className="flex-1"></div>
                    {!is_active && (
                        <div className="text-[10px] uppercase font-bold text-rose-500 tracking-wide flex items-center gap-1.5 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
                            <Clock size={12} />
                            Resets in {time_until_reset}
                        </div>
                    )}
                </div>
                <div className="flex gap-2 sm:gap-3 bg-[#111] p-1.5 rounded-[20px] border border-[#222] focus-within:border-[#444] transition-colors relative shadow-inner">
                    <input
                        value={input}
                        onChange={(e) => set_input(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                F_Handle_Send();
                            }
                        }}
                        disabled={!is_active || is_loading}
                        placeholder={is_active ? `Ask to ${p_full_name} AI...` : "Daily limit reached"}
                        className="flex-1 bg-transparent border-none rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-[13px] sm:text-sm text-zinc-200 placeholder:text-zinc-600 outline-none disabled:opacity-50"
                    />
                    <button
                        onClick={F_Handle_Send}
                        disabled={!input.trim() || !is_active || is_loading}
                        className="bg-zinc-200 text-black hover:bg-white flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl transition-all active:scale-95 disabled:opacity-20 disabled:scale-100 disabled:hover:bg-zinc-200 shadow-md shrink-0"
                        title="Send Message"
                    >
                        <Send size={18} className="-ml-0.5" />
                    </button>
                </div>
            </div>

            {/* Clear Chat Confirmation Modal */}
            {show_clear_modal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
                    <div className="bg-[#111] border border-[#333] rounded-3xl p-6 max-w-[280px] w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
                        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                            <AlertCircle size={24} />
                        </div>
                        <h3 className="text-zinc-200 font-bold mb-2">Are you sure?</h3>
                        <p className="text-zinc-400 text-xs mb-6">This will permanently delete the chat history.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => set_show_clear_modal(false)}
                                className="flex-1 py-2.5 rounded-xl border border-[#333] text-zinc-300 hover:bg-[#222] hover:text-white transition-colors text-xs font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={F_Clear_Chat}
                                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors text-xs font-bold shadow-[0_0_15px_rgba(225,29,72,0.4)]"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
// #endregion
