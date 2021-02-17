const mysql = require("mysql");
const { HOST, USER, PASSWORD, DB_NAME } = require("../config/secret");


// DataBase Connection : 

const connection = mysql.createConnection({
  host     : HOST,
  user     : USER,
  password : PASSWORD,
  database : DB_NAME
});
 
connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
console.log("db connected");
// connection.query("DESC user_table", function(error, data){
//     console.log(data);
// })

module.exports = connection;