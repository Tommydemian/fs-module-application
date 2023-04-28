const fs = require('fs/promises');

// open (32) file descriptor
// read or write

//fs.open('_path', [flag])

(async () => {
    
    // commands:
    const CREATE_FILE = 'create a file' 
    const DELETE_FILE = 'delete a file'
    const RENAME_FILE = 'rename the file'
    const ADD_TO_FILE = 'rename the file'

    //create a file 
    const createFile = async (path) => {
        // just check if it exists
        try {
            // we want to check wheter or not we already have that file 
             const existingFileHandle = await fs.open(path, 'r');
             existingFileHandle.close()
             // we alread have that file...
            return console.log(`the file ${path} already exists.`);
        } catch (error) {
            // we don't want the file,now we should create it
            const newFileHandler = await fs.open(path, 'w');
            console.log('a new file was successfully created');
            newFileHandler.close()
        }
    }

    // delete a file
    const deleteFile = async() => {

    } 

    // rename a file
    const renameFile = async(oldPath, newPath) => {
        console.log(oldPath, 'OLD');
        console.log(newPath, 'NEW');
      try {
        // check if the file exists
       setTimeout(async () => {
           const renamedFile = await fs.rename(oldPath, newPath);
           console.log(`the file was successfully renamed to: ${newPath}`);
       }, 4000)
      } catch (error) {
        console.error('No such file or directory', error);
      }
    }

    // add to file 
    const addToFile = async() => {

    }




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
            await commandFileHandler.read(buff, offset, length, position)


            const command = buff.toString('utf-8');
            // create a file:
            // create a file <path>
            if (command.includes(CREATE_FILE)){
                const filePath  = command.substring((CREATE_FILE).length + 1)
                console.log(String(filePath));
                createFile(filePath)
            }
            // delete a file:
            // delete a file <path>
            if (command.includes(DELETE_FILE)){
                const filePath  = command.substring((DELETE_FILE).length + 1)
                console.log(String(filePath));
                deleteFile(filePath)
            }
            // rename a file:
            // rename the file <oldpath> to <newpath>
            if (command.includes(RENAME_FILE)){
                const setPath  = command.substring(RENAME_FILE.length + 1).split(' ')
                const oldPath = setPath[0]
                const newPath = setPath[2]
                console.log(setPath);
                // console.log(oldPath, 'OLD');
                // console.log(newPath, 'NEW');
                renameFile(oldPath, newPath)
            }
            // add to a file:
            // add to the file <path>
            if (command.includes(ADD_TO_FILE)){
                const filePath  = command.substring((ADD_TO_FILE).length + 1)
                console.log(String(filePath));
                addToFile(filePath)
            }
    })

    // decoder: 01 => meaningul
    // encoder: meaningful => 01


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