const { create ,getUserByUserId , getUser , updateUser, deleteUser } = require("./user.service")
const { genSaltSync, hashSync , compareSync } = require('bcrypt');
const {sign} = require("jsonwebtoken")
const pool = require("../../config/database");
module.exports = {
    createUser :  (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        create(body,(err, results) => {
            if (err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message: "database connection error"
                })
            }
            return res.status(200).json({
                success:1,
                data:results
            })
        });
    },
    getUserByUserId : (req,res) => {
      const id = req.params.id;
      getUserByUserId:(id,(err, results) => {
          if(err) {
              console.log(err);
              return;
           }
           if(!results){
               return res.json({
                   success: 0 ,
                   message:"record not found"
               });
           }
           return res.json({
               success:1,
               data:results
           })
      });
    },
    getUsers: (req,res) => {
        getUsers:((err, results) => {
            if(err) {
                console.log(err);
                return;
             }
             return res.json({
                 success:1,
                 data:results
             })
        });
    },
    updateUsers : (req,res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password=hashSync(body.password,salt);
        updateUsers:(body,(err, results) => {
            if(!results){
                return res.json({
                    success:0,
                    message: "failed updated"
                })
            }
            if(err) {
                console.log(err);
                return;
             }
             return res.json({
                 success:1,
                 messages:"updatted sucessfully"
             })
        });
    },
    deleteUser : (req,res) => {
        const data = req.body;
        deleteUser:(data,(err, results) => {
            if(err) {
                console.log(err);
                return;
             }
             if(!results){
                 return res.json({
                     success: 0 ,
                     message:"record not found"
                 });
             }
             return res.json({
                 success:1,
                 message:"user deleted sucessfully"
            })
        });
    },
    login:(req,res) => {
        const body = req.body;
        getUserByUserEmail(body,email (err,results) => {
          if(err){
              console.log(err);
          }
          if(!results){
              return res.json({
                  success:0,
                  data:"invalid email or password"
              })
          }
          const result = compareSync(body,password,result.password);
          if(result){
              result.password = undefined;
              const jsonwebtoken = sign({result:resilts},"qwe1234",{
                  expiresIn:"1h"
              });
              return res.json({
                  success:1,
                  message:"login successfully",
                  token:jsontoken
              });
              else{
                return res.json({
                    success:0,
                    data:"invalid email or password"
                })
              }
            }
        });
    },
    getUserByUserEmail : (email,callback)=>{
        pool.query(
            `select*from registeration where email =?`,
            [email],
            (error,results,fields) =>{
                if(error){
                    callback(error);
                }
                return callback(null,results[0]);
            }
        )
    }
};