const storageDirectory = require('../../assets/files/files-path').fileStoragePath;
console.log(storageDirectory);
const path = require('path');
const file = require('fs/promises')

class LogginMode{
    constructor(){
       // throw 'Unimplemented Exception'
    }
}

class ConsoleMode extends LogginMode{
    constructor(){
        super();
    }

    log(type, data){
        const date = new Date();
        const dateString = (date.toLocaleString('es-ES','dd-MM-yyyy HH:mm:ss'))
        this.print(`${type}: ${dateString} ${JSON.stringify(data)} `)
        
    }

    print(data){
        console.log(data)
    }
}

class FileMode extends LogginMode{
    static filepath = path.join(storageDirectory,path.sep,'log');
    constructor(){
        super()
   
    }
    log(type, data){
        const date = new Date();
        const dateString = (date.toLocaleString('es-ES','dd-MM-yyyy HH:mm:ss'))
        
     
        const logger = `${type}: ${dateString} ${JSON.stringify(data)}\n`;
        file.appendFile(FileMode.filepath, logger);
        // console.log(FileMode.filepath)

    }
}

function main(){
    const logginMode  = new ConsoleMode();
    const filemode = new FileMode();
    logginMode.log('Error', {statusCode: 500, message: 'Internal server error'})
    filemode.log('Error', {statusCode: 500, message: 'Internal server error'})
}
//main();

module.exports.loggingModes = {
    'console': new ConsoleMode(),
    'file': new FileMode()
}

