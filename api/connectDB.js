import mysql2 from "mysql2";

export const db = mysql2.createPool({
    // connectionaLimit: 50,
    host:"us-cdbr-east-06.cleardb.net",
    user:"ba635792c61fd6",
    password:"f56f807a4b56887",
    database:"heroku_723806395bf9ae8",
    port:3306
})

// db.connect(function(error){
//     if(!!error) console.log(error);
//      else console.log('SQL Database Connected!');
// });

// db.on('error', err => {
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//         // db error reconnect
//         disconnect_handler();
//     } else {
//         throw err;
//     }
// });

export default db;