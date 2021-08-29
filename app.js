const express = require('express');
require("dotenv").config();
const app = express();
const userRouter = require("./api/users/user.router")

app.use("/api/users",userRouter);

// app.get("/api", (req,res)=>{
//     res.json({
//         success : 1,
//         message : "this the res api",
//     });
// });
app.use(express.json());
app.listen(process.env.APP_PORT, ()=>{
    console.log("server run :" , process.env.APP_PORT);
})