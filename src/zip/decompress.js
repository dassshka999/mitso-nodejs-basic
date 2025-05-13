import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const sourcePath = path.join(__dirname, 'files', 'archive.gz');
    const destPath = path.join(__dirname, 'files', 'fileToCompress2.txt');

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destPath);
    const gunzip = createGunzip();

    readStream.pipe(gunzip).pipe(writeStream);

    writeStream.on('error', () => {
        console.error('FS operation failed');
    });
};

await decompress();