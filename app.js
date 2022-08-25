// const http = require('http')
// let myObj = [
//     { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
//     { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
//     { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
//     { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
//     { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
//     { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
//  ]
// const port = http.createServer((req,res)=>{

//     if(req.url=="/" && req.method=="GET"){
//         res.write(JSON.stringify(myObj))
//         res.end()
//     }
//     else if(req.url=="/contact" && req.method=="GET"){
//         res.write("contact page")
//         res.end()
//     }
//     else{
//         res.write("404 notfound page")
//         res.end()
//     }
// })
// port.listen(5000,()=>{console.log("server is running .... ^_^");})


let myObj = [
            { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
            { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
            { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
            { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
            { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
            { name:"Thana",age:27,email:"thana@gmail.com",specialization:"CSE"}, 
         ]
    const express  = require('express')
const app = express()
const mysql = require('mysql2')
const q = mysql.createConnection({
    host:"localhost",
    database:"nodedb",
    user:"root",
    password:""
})
q.connect((err)=>{
    if(!err){
console.log("DB has connected successfully");
}
else{
        console.log("DB hasn't connected successfully");

    }
})
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("homepage")
})
app.get('/users',(req,res)=>{
    q.execute("select * from users",(err,result)=>{ 
        if(!err){
            res.json({users:result})
        }
        else{
            res.send({err:"errr"})
        }
    }) 
})
app.get('/usersReversed',(req,res)=>{
    q.execute("select * from users order by id desc",(err,result)=>{ 
        if(!err){
            res.json({users:result})
        }
        else{
            res.send({err:"errr"})
        }
    }) 
})
app.get('/searchBtnAgesRange',(req,res)=>{
    q.execute("select * from users where age between 20 and 40",(err,result)=>{ 
        if(!err){
            res.json({users:result})
        }
        else{
            res.send({err:"errr"})
        }
    }) 
})
app.get('/usersStartWithAandAgeLessThan30',(req,res)=>{
    q.execute("select * from users where age<30 and name like 'A%'",(err,result)=>{ 
        if(!err){
            res.json({users:result})
        }
        else{
            res.send({err:"errr"})
        }
    }) 
})
 
app.get('/usersEndsWithDorAgeMoreThan50',(req,res)=>{
    q.execute("select * from users where age>50 or name like '%d'",(err,result)=>{ 
        if(!err){
            res.json({users:result})
        }
        else{
            res.send({err:"errr"})
        }
    }) 
})
app.get('/usersContainRorAgeMoreThan20AndLessThan25',(req,res)=>{
    q.execute("select * from users where age between 20 and 25 and name like '%r%'",(err,result)=>{ 
        if(!err){
            res.json({users:result})
        }
        else{
            res.send({err:"errr"})
        }
    }) 
})
app.get('/users/:id',(req,res)=>{
    q.execute(`select * from users where id=${req.params.id}`,(err,result)=>{ 
        if(!err){
            res.json({users:result})
        }else{
            res.send({err:"err"})
        }
    }) 
})
app.patch('/updateUser/:id',(req,res)=>{
    console.log(req.params.id);
    let {name}=req.body
    q.execute(`update users set name='${name}' where id=${req.params.id}`,(err,result)=>{
       if(!err){
           res.json({message:"updated"})
       }
       else{
        res.send({err:"err"})
       }
    })

})
app.put('/updateUser/:id',(req,res)=>{
    console.log(req.params.id);
    let {email,password,name,age} = req.body
    q.execute(`update users set name='${name}',email='${email}',password='${password}',age=${age} where id=${req.params.id}`,(err,result)=>{
        if(!err){
            res.json({message:"updated"})
        }
        else{
            res.send({err:"errrr"})
        }
    })

})
app.delete('/deleteUser/:id',(req,res)=>{
    console.log(req.params.id);
    q.execute(`delete from users  where id=${req.params.id}`,(err,result)=>{
       if(!err){
           res.json({message:"deleted"})
       }
       else{
        res.send({err:"errrrrrr"})
       }
    })

})
app.post("/addUser",(req,res)=>{
    let {email,password,name,age} = req.body
    q.execute(`insert into users (name,email,password,age) values ('${name}','${email}','${password}',${age})`,(err,result)=>{
        if(!err){
            res.json({message:"added"})
        }
        else{
            res.send({err:"errrrrr"})
        }
    })
  
})
app.get("/search/:name",(req,res)=>{ 
    q.execute(`select * from users where name like '%${req.params.name}%'`,(err,result)=>{
        if(!err){
            res.json({user:result})
        }
        else{
            res.send({err:"errrrrrrrrrrrrrrrrr"})
        }
    })
})
app.get('/home',(req,res)=>{
    res.send("home page")
})
app.get('*',(req,res)=>{
    res.send("404 notfound page")
})
app.listen(5000,()=>{
    console.log("hello from thana server which's running .... ^_^ ");
})