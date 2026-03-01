// #region library
import React, { useState } from 'react';
import { motion } from 'framer-motion';
// #endregion

// #region functions
// Main Card Container with flip animation.
export const F_Card_Container = ({
    p_front_content,
    p_back_content
}: {
    p_front_content: React.ReactNode,
    p_back_content: React.ReactNode
}) => {
    // #region local variables
    const [is_flipped, set_is_flipped] = useState(false);
    // #endregion

    // #region functions
    const F_Toggle_Flip = () => set_is_flipped(!is_flipped);
    // #endregion

    return (
        <div className="relative w-full max-w-md h-[600px] perspective-1000">
            <motion.div
                className="w-full h-full relative transition-all duration-500 preserve-3d"
                animate={{ rotateY: is_flipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center">
                    {p_front_content}
                    <button
                        onClick={F_Toggle_Flip}
                        className="mt-auto bg-zinc-100 dark:bg-zinc-800 p-3 rounded-full hover:scale-110 transition-transform"
                    >
                        Flip to AI Chat
                    </button>
                </div>

                <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col rotate-y-180">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">AI Persona</h3>
                        <button onClick={F_Toggle_Flip} className="text-sm font-medium opacity-70">Back to Bio</button>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        {p_back_content}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
// #endregion
