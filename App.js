const express = require ('express');
//const bodyParser = require('body-parser')


const app = express();
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
const port = 3004
const mysql2 = require("./connection")
//configuration
//routing
app.set('view engine' , 'hbs');
app.set('views','./view');
app.use(express.static(__dirname + "/public"))
app.get('/',(req,res) => {
    res.render('index')
});
app.get('/add',(req,res) => {
    res.render('add')
});
app.get('/search',(req,res) => {
    res.render('search')
});
app.get('/update',(req,res) => {
    res.render('update')
});
app.get('/delete',(req,res) => {
    res.render('delete')
});
app.get('/view',(req,res) => {
    let qry = `select * from student`;
    mysql2.query(qry,(err,results) => {
        if(err) throw err
        else
        {res.render('view',{data:results})}
    })
});
app.get('/addemployee',(req,res) =>{
    const {name , phone , email , gendar } = req.query;
    //santization
    let qry = `INSERT INTO student (NAME, phone, email, gendar) VALUES ("${name}",${phone},"${email}","${gendar}")`;
    //let field = [name, phone, email, gendar];
    //console.log({field});
    mysql2.query(qry , (err,results) => {
        if (err) { console.log(err)}
        //else if (results.length > 0 ) { }
        else if (results.affectedRows > 0) {
            res.render('add', {mesg : true})
            
        }
    })
})
app.get('/searchemployee',(req,res) => {
    const {phone} = req.query
    let qry = `select *  from student   where phone=${parseInt(phone)}`
    mysql2.query(qry,[phone],(err,results) => {
        if(err) {console.log(err)}
        else{ 
            if(results.length > 0 ){
                res.render('search',{mesg1 : true ,mesg2 :false , data :results})
            }
            else{  
                res.render('search',{mesg1 : false , mesg2 :true }) 
            }}
    })
})


app.get('/recordemployee',(req,res) => {
    const {name , phone , email , gendar } = req.query
 let qry = ` select *  from student   where phone=${parseInt(phone)}  `
 mysql2.query(qry,(err,results) => {
     if(err) throw err
     else{if(results.length >0){res.render('search')}}
 })
})
app.get('/updatesearch',(req,res) => {
    const {phone} = req.query
    console.log(req.query)
    let qry = `select *  from student   where phone=${parseInt(phone)}`
    mysql2.query(qry,[phone],(err,results) => {
        if(err) {console.log(err)}
        else{ 
            if(results.length > 0 ){
                res.render('update',{mesg1 : true ,mesg2 : false , data : results})
            }
            else{  
                res.render('update',{mesg2 : true , mesg1 : false}) 
            }}
    })
})
-
app.get('/updateemployee',(req,res) => {
    const {name , phone , email , gendar } = req.query
 let qry = ` update student SET NAME = "${name}" , email = "${email}" , gendar = "${gendar}"where phone = ${parseInt(phone)}`
 mysql2.query(qry,(err,results) => {
     if(err) throw err
     else{if(results.affectedRows >0){res.render('update',{umsg : true})}}
 })
})
app.get('/removeemployee',(req,res) => {
    const {phone} = req.query
    let qry = `delete from student   where phone=${parseInt(phone)}`
    mysql2.query(qry,[phone],(err,results) => {
        if(err) {console.log(err)}
        else{ 
            if(results.affectedRows > 0 ){
                res.render('delete',{mesg1 : true ,mesg2 :false})
            }
            else{  
                res.render('delete',{mesg1 : false , mesg2 :true }) 
            }}
    })
})


 
    
    //res.send(req.query )

    //create server
app.listen(port, (err) => {
    if(err){
        console.log(err)
    }
    else
        console.log(`server runing on port no ${port}`)
});