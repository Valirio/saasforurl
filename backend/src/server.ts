import app from './app';
import database from './database';

database.sync({force:true});
console.log('Database Rnning 3001')

app.listen(3000);

console.log("Server rodando na porta 3001")