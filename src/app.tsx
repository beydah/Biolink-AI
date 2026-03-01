// #region library
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { F_Ai_Chat } from './features/ai_chat';
import { F_Heading } from './components/ui/atoms/typography';
import { Sparkles, Github, Linkedin, Globe } from 'lucide-react';
// #endregion

// #region functions
// Main App Component.
function App() {
  // #region local variables
  const [data, set_data] = useState<any>(null);
  const [show_chat, set_show_chat] = useState(false);
  const [is_desktop, set_is_desktop] = useState(false);
  // #endregion

  // #region functons
  useEffect(() => {
    // Open chat automatically on desktop
    const check_desktop = () => window.innerWidth >= 768;
    set_is_desktop(check_desktop());

    // Default open on desktop during initial load
    if (check_desktop()) {
      set_show_chat(true);
    }

    const handle_resize = () => set_is_desktop(check_desktop());
    window.addEventListener('resize', handle_resize);

    // Load link and metadata from data.json, persona from persona.md
    Promise.all([
      fetch('/data.json').then(r => r.json()),
      fetch('/persona.md').then(r => r.text())
    ]).then(([json_data, persona_text]) => {
      set_data({ ...json_data.user, persona: persona_text });

      if (json_data.user?.full_name) {
        document.title = `${json_data.user.full_name} Biolink AI`;
      }
      if (json_data.user?.position) {
        const meta_tag = document.querySelector('meta[name="description"]');
        if (meta_tag) meta_tag.setAttribute("content", `Welcome to the Biolink page of ${json_data.user.full_name}, a ${json_data.user.position}.`);
      }
    }).catch(err => {
      console.error("Failed to load bio data:", err);
    });

    return () => window.removeEventListener('resize', handle_resize);
  }, []);

  const F_Get_Icon = (icon_name: string) => {
    switch (icon_name?.toLowerCase()) {
      case 'github': return <Github size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      default: return <Globe size={18} />;
    }
  };

  const F_Render_Front = () => (
    <div className="flex flex-col items-center w-full h-full relative z-10 transition-opacity duration-300">

      {/* Top right AI Chat toggle button */}
      <button
        onClick={() => set_show_chat(!show_chat)}
        className={`absolute top-2 right-2 p-2.5 rounded-full transition-all duration-300 z-20 shadow-md border border-transparent ${show_chat
          ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
          : 'bg-[#1a1a1a] text-zinc-400 hover:text-white hover:bg-[#222] border-[#333]'
          }`}
        title="Toggle AI Chat"
      >
        <Sparkles size={18} className="transition-colors duration-300" />
      </button>

      <div className="mb-4 mt-6 relative">
        <div className="absolute inset-0 bg-blue-500/10 rounded-full scale-110"></div>
        <img
          src="/avatar.jpg"
          alt="Profile"
          className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-[#333] p-1 bg-[#111] shadow-lg z-10"
        />
      </div>

      <div className="text-center mb-6 px-4">
        <F_Heading p_text={data?.full_name || "Loading..."} p_level={1} p_class_name="text-zinc-100 font-bold tracking-tight text-xl mb-1" />
        <F_Heading p_text={data?.position || ""} p_level={2} p_class_name="text-zinc-400 font-medium tracking-wide text-[13px] capitalize" />
      </div>

      <div className="w-full space-y-3 flex-1 overflow-y-auto px-2 sm:px-4 custom-scrollbar">
        {data?.links?.map((l: any, i: number) => (
          <a
            key={i}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-row items-center justify-center gap-3 w-full py-3 px-6 bg-[#1a1a1a] hover:bg-[#222] rounded-2xl font-medium text-zinc-300 hover:text-white text-center border border-[#2a2a2a] transition-all duration-300 active:scale-95 shadow-sm"
          >
            <span className="text-zinc-500 group-hover:text-blue-400 transition-colors">{F_Get_Icon(l.icon)}</span>
            <span className="text-sm">{l.name}</span>
          </a>
        ))}
      </div>

      <div className="mt-6 mb-4 flex flex-col items-center">
        <div className="bg-white p-2.5 rounded-2xl shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-pointer">
          <QRCodeSVG value={data?.qr_code_link || window.location.href} size={96} level="H" includeMargin={false} />
        </div>
      </div>
    </div>
  );
  // #endregion

  return (
    <div className="h-[100dvh] bg-[#050505] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-[#000] text-zinc-100 flex flex-col items-center p-4 sm:p-6 selection:bg-zinc-800 relative overflow-hidden">
      <div className="flex-1 w-full flex flex-col md:flex-row items-center justify-center max-w-6xl min-h-0">

        {/* Main Business Card */}
        <div className={`w-full max-w-[380px] h-full max-h-[720px] shrink flex flex-col bg-[#0d0d0d] rounded-[32px] border border-[#222] shadow-2xl relative overflow-hidden transition-all duration-300 z-20 ${show_chat && is_desktop ? 'md:ring-1 md:ring-blue-500/20' : ''}`}>

          <div className={`absolute inset-0 p-6 flex flex-col items-center transition-all duration-500 ${show_chat && !is_desktop ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50"></div>
            {F_Render_Front()}
          </div>

          {/* Mobile Overlay Chat */}
          {!is_desktop && (
            <div className={`absolute inset-0 flex flex-col bg-[#0d0d0d] z-30 transition-all duration-300 ${show_chat ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50"></div>
              <div className="flex-1 h-full w-full">
                <F_Ai_Chat p_persona={data?.persona || ""} p_full_name={data?.full_name || ""} on_close={() => set_show_chat(false)} />
              </div>
            </div>
          )}
        </div>

        {/* Desktop Side Chat */}
        <div
          className={`hidden md:flex flex-col h-full max-h-[720px] shrink transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] origin-left z-10 overflow-visible ${show_chat && is_desktop
            ? 'w-[420px] opacity-100 scale-100 translate-x-0 ml-6'
            : 'w-0 opacity-0 scale-95 -translate-x-12 ml-0 pointer-events-none'
            }`}
        >
          <div className="w-full h-full flex flex-col bg-[#0d0d0d] rounded-[32px] border border-[#222] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50"></div>
            <div className="flex-1 min-h-0 w-full flex flex-col">
              <F_Ai_Chat p_persona={data?.persona || ""} p_full_name={data?.full_name || ""} />
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="mt-8 mb-2 w-full text-center text-[11px] font-medium text-zinc-500 transition-opacity duration-300">
        Created by <a href="https://beydahsaglam.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors">Beydah Saglam</a>
      </footer>
    </div>
  );
}

export default App;
// #endregion
