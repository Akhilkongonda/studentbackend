const exp=require('express');
const app=exp();
const bodyParser=require('body-parser');
const cors=require('cors');
app.use(cors());

//run server
app.listen(3500,()=>{
    console.log('server is running in the  port 3500')
})

// stock overflow middleware
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Add the necessary methods
//     optionSuccessStatus: 200
// };





// middlewares
app.use(exp.json());
app.use(cors())
app.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.send("API IS running..");
});

app.use(bodyParser.urlencoded({extended:true}))




// //apis

const studentdata = require('./StudentApi')
app.use('/StudentApi',studentdata);  //here this the frontend serach for the correct path so here it matches to /StudentApi which is in frontend; and moves to the studentdata that is astudentapi.js 


const jwt=require('jsonwebtoken');
 
app.post('/verifylogintoken',async(req,res)=>{
    console.log('token :', req.body);
    const token = req.body.token;
    const decodedToken = jwt.decode(token, { complete: true });
    console.log('Decoded Token:', decodedToken);

    const userloged=decodedToken?.payload["mail"];

    console.log(userloged);

    try{
        let userdata=jwt.verify(token,'abcdefg');
        console.log('tokenn valid')
        res.send({message:"tokenvalid",userinfo:userloged})

    }
    catch(err){
        console.log("token invalid");
        res.send({message:"tokennotvalid"});
    }
})














//error handling middle ware
const errHandlingMiddleware=(err,req,res,next)=>{
    console.log("error in the server",err);
    res.status(201).send({message:err});
}
app.use(errHandlingMiddleware);
//invalid path middleware
const invalidPathMiddleWare = (req, res)=>{
    console.log('Invalid Path:');
    res.status(404).json({message:'Invalid Path'});
}
app.use('*',invalidPathMiddleWare)

