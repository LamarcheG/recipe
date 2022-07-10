import { resolve } from 'path';

export const entry = './server.js';
export const mode = 'production';
export const target = 'node';
export const output = {
    path: resolve(__dirname, '.'),
    filename: 'server.bundle.js'
};