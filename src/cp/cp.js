import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
    const child = spawn('node', ['files/script.js', ...args]);

    child.stdout.on('data', (data) => {
        console.log(`Child says: ${data.toString()}`);
    });

    child.stdin.end();
};

// Put your arguments in function call to test this functionality
spawnChildProcess(process.argv.slice(2));
