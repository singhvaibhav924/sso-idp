const mysql = require("mysql");
const env = require("dotenv").config();
module.exports = function authenticate(email,pwd) {
    // let con = mysql.createConnection({
    //     host: process.env.host, 
    //     user: process.env.user,
    //     database: process.env.db,
    //     password: process.env.pwd
    // });
    // con.connect(error => {
    //     if(error) throw error;
    //     console.log("Connected!");
    //     con.query(`select * from Users where Email = "${email}"`,(err,res) => {
    //         if(err) console.log(" Error in Retrieving");
    //         if(res[0].Password==pwd) {
    //             return res[0];
    //         } else {
    //             return "none";
    //         }
    //     }); 
    // })
    // cant find a free online database hosting hence creating a dummy code
    let res = [
        {
            Name: "Vaibhav Singh" ,
            Password: "qwerty",
            Email: "test@gmail.com" ,
            Sex : "Male",
            Age: 21
        }
    ]
    if(res[0].Password==pwd) {
        return res[0];
    } else {
        return "none";
    }
}