// #region tests
import test from 'node:test';
import assert from 'node:assert/strict';
import { F_Parse_Chat_Request } from '../netlify/functions/chat_validation.js';

test('accepts bounded chat payload and keeps only validated fields', () => {
    const parsed = F_Parse_Chat_Request(JSON.stringify({
        prompt: ' hello ',
        persona: 'A profile',
        history: [{ role: 'user', content: 'Earlier prompt' }],
        unexpected: 'ignored',
    }));

    assert.deepEqual(parsed.value, {
        prompt: 'hello',
        persona: 'A profile',
        history: [{ role: 'user', content: 'Earlier prompt' }],
    });
});

test('rejects invalid JSON and oversized bodies', () => {
    assert.equal(F_Parse_Chat_Request('{').statusCode, 400);
    assert.equal(F_Parse_Chat_Request(JSON.stringify({ prompt: 'x'.repeat(100000) })).statusCode, 413);
});

test('rejects out-of-bounds prompt, persona, and history', () => {
    assert.equal(F_Parse_Chat_Request(JSON.stringify({ prompt: 'x'.repeat(2001) })).statusCode, 400);
    assert.equal(F_Parse_Chat_Request(JSON.stringify({ prompt: 'ok', persona: 'x'.repeat(10001) })).statusCode, 400);
    assert.equal(F_Parse_Chat_Request(JSON.stringify({ prompt: 'ok', history: Array(6).fill({ role: 'ai', content: 'x' }) })).statusCode, 400);
    assert.equal(F_Parse_Chat_Request(JSON.stringify({ prompt: 'ok', history: [{ role: 'system', content: 'x' }] })).statusCode, 400);
});
// #endregion
