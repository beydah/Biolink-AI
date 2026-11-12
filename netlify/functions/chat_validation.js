// #region functions
const MAX_BODY_BYTES = 96 * 1024;
const MAX_PROMPT_CHARS = 2000;
const MAX_PERSONA_CHARS = 10000;
const MAX_HISTORY_MESSAGES = 5;
const MAX_HISTORY_MESSAGE_CHARS = 2000;

export const F_Parse_Chat_Request = (p_body) => {
    if (typeof p_body !== 'string') {
        return { statusCode: 400, error: 'A JSON request body is required.' };
    }
    if (Buffer.byteLength(p_body, 'utf8') > MAX_BODY_BYTES) {
        return { statusCode: 413, error: 'Request body is too large.' };
    }

    let request_body;
    try {
        request_body = JSON.parse(p_body);
    } catch {
        return { statusCode: 400, error: 'Request body must be valid JSON.' };
    }

    if (!request_body || typeof request_body !== 'object' || Array.isArray(request_body)) {
        return { statusCode: 400, error: 'Request body must be a JSON object.' };
    }

    const { prompt, persona = '', history = [] } = request_body;
    if (typeof prompt !== 'string' || prompt.trim().length === 0 || prompt.length > MAX_PROMPT_CHARS) {
        return { statusCode: 400, error: `Prompt must contain 1-${MAX_PROMPT_CHARS} characters.` };
    }
    if (typeof persona !== 'string' || persona.length > MAX_PERSONA_CHARS) {
        return { statusCode: 400, error: `Persona must be a string up to ${MAX_PERSONA_CHARS} characters.` };
    }
    if (!Array.isArray(history) || history.length > MAX_HISTORY_MESSAGES) {
        return { statusCode: 400, error: `History must contain at most ${MAX_HISTORY_MESSAGES} messages.` };
    }

    for (const message of history) {
        if (!message || typeof message !== 'object' || Array.isArray(message) ||
            !['user', 'ai'].includes(message.role) || typeof message.content !== 'string' ||
            message.content.length === 0 || message.content.length > MAX_HISTORY_MESSAGE_CHARS) {
            return { statusCode: 400, error: 'History contains an invalid message.' };
        }
    }

    return {
        value: {
            prompt: prompt.trim(),
            persona,
            history: history.map(({ role, content }) => ({ role, content })),
        },
    };
};
// #endregion
