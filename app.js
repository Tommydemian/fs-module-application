const fs = require('fs/promises');

// open (32) file descriptor
// read or write

//fs.open('_path', [flag])

(async () => {
    const watcher = fs.watch('./command.txt');
    const commandFileHandler = await fs.open('./command.txt', 'r'); // fs.open => creates a instance of FileHandler class

    commandFileHandler.on('change', async() => {
        console.log('the file was changed')
            // we want to read the contents of the file
            const size = (await commandFileHandler.stat()).size;
            // allocate the buffer with the size of the file
            const buff = Buffer.alloc(size);
            // the location at which we want to start filling our buffer
            const offset = 0;
            // how many bytes we want to read
            const length = buff.byteLength;
            // the position that we want to start reading the file from
            const position = 0

            // get the size of our file:  
            const content = await commandFileHandler.read(
                buff,
                offset,
                length,
                position
            );
            console.log(content);
    })

    // decoder


    // watcher...
    for await (const event of watcher) {
        if (event.eventType === 'change') {
            // the file was changed...
            commandFileHandler.emit('change')
            
        };
    }
})()

// watcher is an async iterator.

// possible events => change, rename => {create, delete or rename}