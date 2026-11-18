// Harmless command for ep to run: reports which package folder it ran in. Plain ES5 so it runs on every Node.
console.log('VISIT:' + require('path').basename(process.cwd()));
