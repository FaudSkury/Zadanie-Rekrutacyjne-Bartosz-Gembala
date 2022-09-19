import express from "express";
import mongoose from "mongoose";
import { auth } from "express-openid-connect";
import { ErrorRequestHandler } from "express";

import UserRouter from "./routes/UserRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Cors setup

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

//Auth setup (using auth 0 service)

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "FAjt3gRP9Mf7I6iRR4VslPpcYOMjOPJA",
  issuerBaseURL: "https://dev-qjuukv5s.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

//Error handling setup
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).send(err.message);
  console.error(err);
};

//Custom Routes MVC (views are not included) since they were not required
// but if needed in feedback I can provide react_app or ejs templates for this API

app.use("/api", UserRouter);
app.use(errorHandler);

//DB conncection, using noSQL - mongoDB with mongoose
async function connentToMongo() {
  try {
    await mongoose.connect(
      "mongodb+srv://Bartosz:aA695001019@cluster0.ercxsh4.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.log(error);
  }
}

app.listen(PORT, () => {
  connentToMongo();
  console.log("Listening at port " + PORT);
});
