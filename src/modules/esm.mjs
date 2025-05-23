import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { fileURLToPath } from 'url';
import fs from 'fs/promises'; 
import './files/c.js';

const random = Math.random();

let unknownObject;
if (random > 0.5) {
    
    unknownObject = JSON.parse(await fs.readFile(path.resolve('files/a.json'), 'utf-8'));
} else {
    
    unknownObject = JSON.parse(await fs.readFile(path.resolve('files/b.json'), 'utf-8'));
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${fileURLToPath(import.meta.url)}`);
console.log(`Path to current directory is ${path.dirname(fileURLToPath(import.meta.url))}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };