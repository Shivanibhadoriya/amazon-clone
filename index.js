debugger
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const tempelatePath = path.join(__dirname,"../tempelates");
app.set("view engine","hbs");
app.set("views",tempelatePath);
app.use(express.json());

// app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.json());

app.get("/",(req,res)=>{
  res.render("login");
});

app.get("/signup",(req,res)=>{
  res.render("signup");
});

app.post("/signup",async(req,res)=>{
   const data={
     email:req.body.email,
     password:req.body.password
   };
   try{
       await collection.create(data);
       res.render("home");
   } catch(error){
    console.error("Error creating user :",error);
    res.status(500).send("Internal Server Error");
   }
})
// Start the server
app.listen(3000, () => {
  console.log(`Server running on port`);
});
