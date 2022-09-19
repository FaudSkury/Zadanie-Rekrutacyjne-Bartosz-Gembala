"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_openid_connect_1 = require("express-openid-connect");
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Cors setup
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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
app.use((0, express_openid_connect_1.auth)(config));
// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
//Error handling setup
const errorHandler = (err, req, res, next) => {
    res.status(500).send(err.message);
    console.error(err);
};
//Custom Routes MVC (views are not included) since they were not required
// but if needed in feedback I can provide react_app or ejs templates for this API
app.use("/api", UserRoutes_1.default);
app.use(errorHandler);
//DB conncection, using noSQL - mongoDB with mongoose
function connentToMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect("mongodb+srv://Bartosz:aA695001019@cluster0.ercxsh4.mongodb.net/?retryWrites=true&w=majority");
        }
        catch (error) {
            console.log(error);
        }
    });
}
app.listen(PORT, () => {
    connentToMongo();
    console.log("Listening at port " + PORT);
});
