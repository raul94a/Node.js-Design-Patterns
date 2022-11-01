/**
 * The objective of this exercise is to build a logging strategy.
 * There're two options: console and file.
 * The idea is to use the Template patterns to do that, as we were in a full OOP Language
 * 
 *  */

const {loggingModes} = require('../template/logging/logging-mode');
const {console: consoleMode, file: filemode} = loggingModes;


class LogStrategy{
    constructor(strategy,data){
        this.strategy = strategy
        this.data = data
    }

    log(type){
        this.strategy.log(type,this.data);
    }
    changeStrategy(strategy){
        this.strategy = strategy;
    }
}

function main(){
    const log = new LogStrategy(consoleMode, {status: 200, body: {
        name: 'Raul Albin Alba',
        token: 'ez789KloDMNDYtR54R0_%',
        hash: 'sha256',

    }})

    log.log('Info');
    log.changeStrategy(filemode)
    log.log('warn')
    
}

main();
