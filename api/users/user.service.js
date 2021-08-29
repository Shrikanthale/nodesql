const pool = require("../../config/database")


module.exports = {

    create:(data, callback) => {
        pool.query(
            `insert into registeration(customerId,name,email,password)
            values(?,?,?,?)`
            [
                data.customerId,
                data.name,
                data.email,
                data.password
            ],
            (error , results ,fields) => {
                if(error){
                   return callback(error);
                }
                return callback(null , results)
            }
        )
    },
    getUsers: callback => {
        pool.query(
            'select id,customerId,name,email,',
            [],
            (error, results,fields) =>{
              if(error) {
                 return  callback(error);
               }
               return callback(null, results);    
            }
        )
    },
    getUserByUserId: (id,callback) => {
        pool.query(
            'select id,customerId,name,email where id = ? ',
            [id],
            (error, results,fields) =>{
              if(error) {
                 return  callback(error);
               }
               return callback(null, results[0]);    
            }
        )
    },
    updateUsers: callback => {
        pool.query(
            'update regestration set ,customerId=? ,name=? , email=? , password=? where id=?,',
            [
                data.customerId,        
                data.name,
                data.email,
                data.password.name,
                data.id
            ],
            (error, result,fields) =>{
              if(error) {
                 return  callback(error);
               }
               return callback(null, results);    
            }
        )
    },
    deleteUser: (data,callback) => {
        pool.query(
            'delete from registration where id = ? ',
            [data.id],
            (error, results,fields) =>{
              if(error) {
                 return  callback(error);
               }
               return callback(null, results[0]);    
            }
        )
    }   
}