const fs = require('fs/promises');

// open (32) file descriptor
// read or write

//fs.open('_path', [flag])

(async () => {
        const watcher = fs.watch('./command.txt');
        const commandFileHandler = await fs.open('./command.txt', 'r'); // fs.open => creates a instance of FileHandler class

        for await (const event of watcher) {
            if (event.eventType === 'change') {
                // the file was changed...
                console.log('the file was changed')
                // we want to read the contents of the file
                const size = (await commandFileHandler.stat()).size; 
                const buff = Buffer.alloc(size);
                const offset = 0;
                const length = buff.byteLength;
                const position = 0
                
                // get the size of our file:  
                const content = commandFileHandler.read(buff, offset, length, position);
               console.log(content);
            };
        }  
})()

// watcher is an async iterator.

// possible events => change, rename => {create, delete or rename}