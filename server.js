const express = require("express");
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const path = require("path");
const authenticate = require("./autheticate");
let samlreq;
let records = "";
app.use(cors({
    origin: '*'
})); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
//app.use("/",express.static(path.join(__dirname,"public")));
app.get("/",(req,res) => { 
    samlreq = req.query.saml;
    console.log("IDP Running "+samlreq); 
    res.sendFile(path.resolve("public/index.html"));
});
app.post("/",(req,res) => {
    console.log(" "+req.body.Email);
    records = authenticate(req.body.Email,req.body.pwd);
    console.log(records);
    if(records!="none") {
        //generate saml using database
       // console.log(records);
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2); 
        let instant = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}TZ`
    
        let samlres = `
        <samlp:Response xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" ID="${process.env.ID}" Version="2.0" IssueInstant="${instant}" Destination="${process.env.redirect_url}" InResponseTo="ONELOGIN_4fee3b046395c4e751011e97f8900b5273d56685">
        <saml:Issuer>${process.env.idp_url}</saml:Issuer>
        <samlp:Status>
          <samlp:StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
        </samlp:Status>
        <saml:Assertion xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xs="http://www.w3.org/2001/XMLSchema" ID="${process.env.ID}" Version="2.0" IssueInstant="${instant}">
          <saml:Issuer>${process.env.idp_url}</saml:Issuer>
          <saml:Subject>
            <saml:NameID SPNameQualifier="${process.env.redirect_url}" Format="urn:oasis:names:tc:SAML:2.0:nameid-format:transient">_ce3d2948b4cf20146dee0a0b3dd6f69b6cf86f62d7</saml:NameID>
            <saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
              <saml:SubjectConfirmationData NotOnOrAfter="2024-01-18T06:21:48Z" Recipient="http://sp.example.com/demo1/index.php?acs" InResponseTo="ONELOGIN_4fee3b046395c4e751011e97f8900b5273d56685"/>
            </saml:SubjectConfirmation>
          </saml:Subject>
          <saml:Conditions NotBefore="2014-07-17T01:01:18Z" NotOnOrAfter="2024-01-18T06:21:48Z">
            <saml:AudienceRestriction>
              <saml:Audience>http://sp.example.com/demo1/metadata.php</saml:Audience>
            </saml:AudienceRestriction>
          </saml:Conditions>
          <saml:AuthnStatement AuthnInstant="2014-07-17T01:01:48Z" SessionNotOnOrAfter="2024-07-17T09:01:48Z" SessionIndex="_be9967abd904ddcae3c0eb4189adbe3f71e327cf93">
            <saml:AuthnContext>
              <saml:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:Password</saml:AuthnContextClassRef>
            </saml:AuthnContext>
          </saml:AuthnStatement>
          <saml:AttributeStatement>
            <saml:Attribute Name="Email" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
              <saml:AttributeValue xsi:type="xs:string">${records.Email}</saml:AttributeValue>
            </saml:Attribute>
            <saml:Attribute Name="Name" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
              <saml:AttributeValue xsi:type="xs:string">${records.Name}</saml:AttributeValue>
            </saml:Attribute>
            <saml:Attribute Name="Sex" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
              <saml:AttributeValue xsi:type="xs:string">${records.Sex}</saml:AttributeValue>
              </saml:Attribute>
              <saml:Attribute Name="Age" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic">
              <saml:AttributeValue xsi:type="xs:string">${records.Age}</saml:AttributeValue>
              </saml:Attribute>
              </saml:AttributeStatement>
        </saml:Assertion>
      </samlp:Response>
      `;
        res.redirect(process.env.redirect_url+"?saml="+samlres);
    } else {
        res.sendFile(path.resolve("public/index.html"));
        }
        res.end();
});
app.listen(process.env.PORT || 6900);