import { v6 as uuidv6 } from 'uuid'
import crypto from 'crypto'
import client from '../config/db';

export const createSessionToken = async (userId: string): Promise<string> => {
    const id = uuidv6();
    const sessionToken = crypto.randomBytes(64).toString('hex');
    const query = `
        INSERT INTO sessions (id, user_id, session_token, created_at, expires_at) 
        VALUES ($1, $2, $3, NOW(), NOW() + INTERVAL '7 days')
    `;
    const values = [id, userId, sessionToken];

    try {
        await client.query(query, values);
        return sessionToken;
    } catch (error) {
        console.error('Error creating session token:', error);
        throw new Error('Failed to create session token');
    }
};

export const cleanupSessions = async (userId: string) => {
    try {
        const query = 'DELETE FROM sessions WHERE user_id = $1 AND created_at < NOW()';
        await client.query(query, [userId])
    }
    catch (error) {
        console.log("Error during session cleanup", error)
    }

}
