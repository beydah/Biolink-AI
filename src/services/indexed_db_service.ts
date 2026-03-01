import { openDB } from 'idb';
import type { IDBPDatabase } from 'idb';

// #region global variable
const DB_NAME = 'biolink_db';
const DB_VERSION = 2;
// #endregion

// #region functions
// Initialize the persistent database.
const F_Init_Db = async (): Promise<IDBPDatabase> => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion) {
            if (!db.objectStoreNames.contains('settings')) {
                db.createObjectStore('settings');
            }
            if (!db.objectStoreNames.contains('chat_history')) {
                db.createObjectStore('chat_history', { keyPath: 'id', autoIncrement: true });
            }

            // Handle schema migration for usage_limits to change keyPath to 'id'
            if (db.objectStoreNames.contains('usage_limits')) {
                if (oldVersion < 2) {
                    db.deleteObjectStore('usage_limits');
                    db.createObjectStore('usage_limits', { keyPath: 'id' });
                }
            } else {
                db.createObjectStore('usage_limits', { keyPath: 'id' });
            }
        },
    });
};

// Save a setting to the database.
export const F_Save_Setting = async (p_key: string, p_value: any) => {
    const db = await F_Init_Db();
    await db.put('settings', p_value, p_key);
};

// Load a setting from the database.
export const F_Load_Setting = async (p_key: string) => {
    const db = await F_Init_Db();
    return db.get('settings', p_key);
};

// Update daily AI usage limit.
export const F_Update_Usage = async (p_count: number, p_reset_at: number) => {
    const db = await F_Init_Db();
    await db.put('usage_limits', { id: 'active_limit', count: p_count, reset_at: p_reset_at });
};

// Get daily AI usage from the store.
export const F_Get_Usage = async () => {
    const db = await F_Init_Db();
    return db.get('usage_limits', 'active_limit');
};

// Save chat history
export const F_Save_Chat_History = async (p_messages: any[]) => {
    const db = await F_Init_Db();
    await db.put('chat_history', { id: 'main_chat', messages: p_messages });
};

// Load chat history
export const F_Load_Chat_History = async () => {
    const db = await F_Init_Db();
    const data = await db.get('chat_history', 'main_chat');
    return data ? data.messages : [];
};

// Clear chat history
export const F_Clear_Chat_Db = async () => {
    const db = await F_Init_Db();
    await db.delete('chat_history', 'main_chat');
};
// #endregion
