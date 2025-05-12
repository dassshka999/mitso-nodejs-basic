import { access, mkdir, readdir, copyFile, stat } from 'fs/promises';
import { constants } from 'fs';
import { join } from 'path';

const copy = async () => {
    const sourceDir = 'files';
    const destDir = 'files_copy';

    try {
        await access(sourceDir, constants.F_OK);

        try {
            await access(destDir, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') {
                throw new Error('FS operation failed');
            }
        }

        await mkdir(destDir, { recursive: true });

        const copyRecursive = async (src, dest) => {
            const entries = await readdir(src, { withFileTypes: true });
            for (const entry of entries) {
                const srcPath = join(src, entry.name);
                const destPath = join(dest, entry.name);

                if (entry.isDirectory()) {
                    await mkdir(destPath);
                    await copyRecursive(srcPath, destPath);
                } else if (entry.isFile()) {
                    await copyFile(srcPath, destPath);
                }
            }
        };

        await copyRecursive(sourceDir, destDir);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

await copy();
