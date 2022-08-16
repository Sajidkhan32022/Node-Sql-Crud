const mysql2 = require('mysql2')
const con = mysql2.createConnection({
    host : "localhost",
    user : "root",
    password : "rootuser",
    database: "students",
    port : "3306"
});
con.connect((err) => {
   if (err) throw err; 
   console.log('connection  created.....!! ')
})
module.exports=con;
