import { promises as fs } from 'fs';
import { join } from 'path';

const list = async () => {
    const folderPath = join('files');
    try {
      const files = await fs.readdir(folderPath); 
      console.log(files);
    } catch (err) {
      throw new Error('FS operation failed');
    } 
};

await list();