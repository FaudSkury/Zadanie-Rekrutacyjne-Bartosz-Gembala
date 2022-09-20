# Zadanie-Rekrutacyjne-Bartosz-Gembala

1. To start the project type: npm start in your terminal

2. App starts at localhost:3000. All required endpoints are accesible via
   url at localhost:3000/api/${endpoint}

3. Auth happens via auth 0 service, you can use your google account to login
   I find this service the most suitable for the requirements of the tast. 
   -Auth can happen without a frontend
   -All endpoints can be used in the browser
   -Its easy to turn the auth off for postman testing
   -There is no need to store password

4. To login localhost:3000/login to logout localhost:3000/logout
  
5. Src folder contains ts files, dist folder contains js (compiled) files


This project was made with use of express.js, mongoose and TypeScript
(I have kept all the vulnerable data in the code for the ease of use I am aware of the environmentals)
