var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('Express'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/public',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

// Order database

app.post("/order",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var food = req.body.food;
    var quantity = req.body.quantity;
    var address = req.body.address
    
    
    var data = {
        "name": name,
        "email" : email,
        "phone": phone,
        "food" : food,
        "quantity" : quantity,
        "address" : address
    }

    db.collection('order').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Order placed successfully.")
    });

    return res.redirect('order_success.html')

})

// Feedback database


app.post("/feedback",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var feedback = req.body.feedback;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "feedback" : feedback
    }

    db.collection('feedback').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Feedback submitted successfully.")
    });

    return res.redirect('index.html')

})

// Login

app.post("/login",async(req,res) =>{
    
    try{
        var uname = req.body.uname;
        var password = req.body.password;

        var username = await signup.findOne({uname});
        if(username.password === password){
            res.status(201).render("index")
        }else{
            res.send("Invalid login details");
        }
    }catch(error){
        res.status(400).send("Invalid username")
    }
        

    
})

// Signup

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var username = req.body.username;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "phno": phno,
        "username":username,
        "password" : password
    }

    db.collection('register').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Data inserted successfully")
    });

    return res.redirect('index.html')

})




app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(8000);


console.log("Listening on PORT 8000");

