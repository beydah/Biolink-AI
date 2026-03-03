// #region library
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
// #endregion

// #region functions
// Utility for merging tailwind classes.
function F_Cn(...p_inputs: ClassValue[]) {
    return twMerge(clsx(p_inputs));
}

// Atomic Button component.
export const F_Button = ({
    p_children,
    p_class_name,
    p_on_click,
    p_disabled = false
}: {
    p_children: React.ReactNode,
    p_class_name?: string,
    p_on_click?: () => void,
    p_disabled?: boolean
}) => {
    // #region objects
    const base_styles = "px-4 py-2 rounded-lg transition-all active:scale-95 disabled:opacity-50";
    // #endregion

    return (
        <button
            className={F_Cn(base_styles, p_class_name)}
            onClick={p_on_click}
            disabled={p_disabled}
        >
            {p_children}
        </button>
    );
};
// #endregion
