import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const cpuCount = os.cpus().length;
    const results = [];

    const workerPath = path.join(__dirname, 'worker.js');

    const runWorker = (workerData) => {
        return new Promise((resolve) => {
            const worker = new Worker(workerPath);

            worker.once('message', (result) => {
                resolve({ status: 'resolved', data: result });
            });

            worker.once('error', () => {
                resolve({ status: 'error', data: null });
            });

            worker.postMessage(workerData);
        });
    };

    const tasks = [];
    for (let i = 0; i < cpuCount; i++) {
        tasks.push(runWorker(10 + i));
    }

    const finalResults = await Promise.all(tasks);
    console.log(finalResults);
};

await performCalculations();