import { promises as fs } from 'fs';
import { join } from 'path';

const rename = async () => {
    const oldFilePath = join('files', 'wrongFilename.txt');
    const newFilePath = join('files', 'properFilename.md');

    try {

        await fs.access(oldFilePath);

        try {
            await fs.access(newFilePath);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
        }

        await fs.rename(oldFilePath, newFilePath);
    } catch (err) {
        throw err;
    }
};

await rename();