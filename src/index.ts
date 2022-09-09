import dotenv from 'dotenv';
import { RPGClient } from './structures/Client';
dotenv.config();

export const client = new RPGClient();
client.start();