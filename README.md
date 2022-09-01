# sso-idp\
Deployment - https://sso-idp.herokuapp.com/ \
A basic Identity Provider for Single-Sign-On using SAML \
It works as follows - \
  User visits on https://sso-sp.herokuapp.com/ which is a service provider. \
  User instantly gets redirect along with a SAML request to https://sso-idp.herokuapp.com/ which is an Identity Provider for their authentication. \
  User Enters Details on IDP and press submit.\
  IDP authenticates the User from DB and then redirect back to the SP page along with a SAML response containing all the infos about the User. \
 \
To build this in your pc run ``` npm install ```\
A lot more features are still need to be added, its a basic app with only minimal functionalities. \
Feel Free to Contribute !!! Happy Coding :-) 
