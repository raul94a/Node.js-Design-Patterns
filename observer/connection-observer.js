const { EventEmitter,once } = require('events')


class DB extends EventEmitter{
    connected = false;
    constructor(){
        super();
        this.$connect()
        this.$checkConnection()
        this.failQueries = [];

    }

    async $checkConnection(){
        await once(this, 'connect');
    }

    $connect(){
    
            this.emit('connect','DB IS NOW CONNECTED');
            this.connected = true;

    
    }

    turnOn(){
        this.$connect()
    }

    turnOff(){
        this.connected = false;
        this.emit('disconnect', 'Database has been disconected');
    }

    $saveQuery(query){
        this.failQueries.push(query);
        this.emit('saveQuery', `DISCONNECTED: ${query}`);
    }
    async triggerQuery(query, wait = false){
        if(wait) await once(this,'connect');
        if(!this.connected){
            this.$saveQuery(query);
            return;
        }
        this.emit('query', `CONNECTED: ${query}`);    
    }

}

const db = new DB();

db.on('connect', (connection) => {
    console.log(connection)
    if(db.failQueries.length !== 0){
        for(const query of db.failQueries){
            console.log(query);
        }
    }
})
db.on('disconnect',(data)=>console.log(data));
db.on('saveQuery',(data)=>console.log(''));
db.on('query', (data)=>console.log(data))


db.triggerQuery('SELECT * FROM USERS WHERE age >= 18 & email LIKE %@gmail.es LIMIT 5')
db.turnOff();
db.triggerQuery('SELECT * FROM products where price < 55.2',false);
db.triggerQuery('SELECT * FROM payments');
db.turnOn();
db.triggerQuery('UPDATE users set premium = 1 where uid = ?');
db.triggerQuery('DELETE users where premium = 0');



