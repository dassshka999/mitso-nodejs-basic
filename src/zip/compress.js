import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from 'path';
import { fileURLToPath } from 'url';

const compress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const sourcePath = path.join(__dirname, 'files', 'fileToCompress.txt');
    const destPath = path.join(__dirname, 'files', 'archive.gz');

    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(destPath);
    const gzip = createGzip();

    readStream.pipe(gzip).pipe(writeStream);

    writeStream.on('error', () => {
        console.error('FS operation failed');
    });
};

await compress();