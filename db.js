const mysql=require('mysql');

//connecting to data base
const connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root1234',
    database:'result_analysis'
});
//checking if connection is succesful or not
connection.connect((error)=>{
    if(error){
        console.log('error in db',error);
    }
    else{
        console.log('db connection succesful');
    }
    
})

module.exports=connection;


