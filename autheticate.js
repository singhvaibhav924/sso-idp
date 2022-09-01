const mysql = require("mysql");
const env = require("dotenv").config();
module.exports = function authenticate(email,pwd) {
    let con = mysql.createConnection({
        host: process.env.host, 
        user: process.env.user,
        database: process.env.db,
        password: process.env.pwd
    });
    con.connect(error => {
        if(error) {
            return "none";
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
                    return result[0];
                } else {
                    return "none";
                }
            }
            else {
                console.log(res[0]);
                if(res[0].Password==pwd) {
                    return res[0];
                } else {
                    return "none";
                }
            }
            
        }); 

        }
            })
    
}