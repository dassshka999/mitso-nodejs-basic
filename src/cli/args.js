const parseArgs = () => {
    const args = process.argv.slice(2);

    for (let i = 0; i < args.length; i += 2) {
        const key = args[i];
        const value = args[i + 1];

        if (key.startsWith('--') && value !== undefined) {
            const propName = key.slice(2);
            console.log(`${propName} is ${value}`);
        }
    }
};

parseArgs();