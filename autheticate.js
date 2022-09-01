const mysql = require("mysql");
const env = require("dotenv").config();
module.exports = function authenticate(email,pwd) {
    return new Promise((resolve, reject) => {
        let con = mysql.createConnection({
            host: process.env.host, 
            user: process.env.user,
            database: process.env.db,
            password: process.env.pwd
        });
        con.connect(error => {
            if(error) {
                resolve("none");
            } else {
                console.log("Connected!");
            con.query(`select * from Users where Email = "${email}"`,(err,res) => {
                if(err) {
                    console.log(" Error in Retrieving");
                    let result = [
                        {
                            Name: "Vaibhav Singh" ,
                            Password: "qwerty",
                            Email: "test@gmail.com" ,
                            Sex : "Male",
                            Age: 21
                        }
                    ]
                    if(result[0].Password==pwd) {
                        resolve(result[0]);
                    } else {
                        resolve("none");
                    }
                }
                else {
                    console.log(res[0]);
                    console.log(res[0].Email);
                    if(res[0].Password==pwd) {
                        resolve(res[0]);
                    } else {
                        resolve("none");
                    }
                }
                
            }); 
    
            }
                })
     
    })
}