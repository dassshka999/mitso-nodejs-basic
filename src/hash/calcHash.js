import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

    try {
        const fileBuffer = await readFile(filePath);
        const hash = createHash('sha256').update(fileBuffer).digest('hex');
        console.log(hash);
    } catch (error) {
        console.error('FS operation failed');
    }
};

await calculateHash();