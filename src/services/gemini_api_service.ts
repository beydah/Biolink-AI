
// #endregion

export const F_Send_Ai_Message = async (p_user_prompt: string, p_persona: string, p_history: { role: 'user' | 'ai', content: string }[] = []) => {
    const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            prompt: p_user_prompt,
            persona: p_persona,
            history: p_history
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch from proxy');
    }

    const data = await response.json();
    return data.text;
};
// #endregion
