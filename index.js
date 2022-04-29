var express =require ('express');
var mysql = require ('mysql');
var app = express();
const bodyParser = require ('body-parser');
const Connection = require('mysql/lib/Connection');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.listen(5000,function(){
    console.log('app listening on port 5000')

});

const pool = mysql.createPool({

connectionLimit :10,
host:'localhost',
user:'root',
password:'root',
database:'GESTION',
port:'8889',


})






app.get('/listUsers',(req,res)=>{
pool.getConnection((err,connection)=>{
if(err) throw err
//console.log(connecte as id ${connection.threadId})
connection.query('select * from user',(err,rows)=>{

    connection.release()
    if(!err){
        res.send(rows)
    }
    else{
        console.log(err)
    }
})})})

//get user by id
app.get('/listUsers/:id',(req,res)=>{
    pool.getConnection((err,connection)=>{
    if(err) throw err
    //console.log(connecte as id ${connection.threadId})
    connection.query('select * from user WHERE id = ?',[req.params.id],(err,rows)=>{
    
        connection.release()
        if(!err){
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })})})
    

//delete user
app.delete('/listUsers/:id',(req,res)=>{
    pool.getConnection((err,connection)=>{
    if(err) throw err
    //console.log(connecte as id ${connection.threadId})
    connection.query('delete from user WHERE id = ?',[req.params.id],(err,rows)=>{
    
        connection.release()
        if(!err){
            res.send('user is removed ')
        }
        else{
            console.log(err)
        }
    })})})
    
//create user
app.post('/createUser',(req,res)=>{
    pool.getConnection((err,connection)=>{
    if(err) throw err
    //console.log(connecte as id ${connection.threadId})

    const params =req.body
    connection.query('INSERT INTO user SET ?',params,(err,rows)=>{
    
        connection.release()
        if(!err){
            res.send('user is created')
        }
        else{
            console.log(err)
        }
    })
console.log(req.body)


})})


//update user
app.put('/updateUser',(req,res)=>{
    pool.getConnection((err,connection)=>{
    if(err) throw err
    //console.log(connecte as id ${connection.threadId})

    const params =req.body
    const {id,firstname,lastname,email,password}=req.body

    connection.query('UPDATE user SET firstname = ? WHERE id =?',[firstname,id],(err,rows)=>{
    
        connection.release()
        if(!err){
            res.send('user is updated')
        }
        else{
            console.log(err)
        }
    })
console.log(req.body)


})})

