import express from "express";
// thư viện lấy tham số từ client gửi cho server
import bodyParser from "body-parser";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';
import helmet from 'helmet'; // for security
import compression from 'compression'; // for response size optimization
import morgan from 'morgan'; // for logging

require('dotenv').config();

let app = express();
app.use(helmet());
app.use(morgan('combined'));
app.use(compression());
app.use(cors({
    credentials: true,
    origin: true,
}));

// app.use(cors());

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

initWebRoutes(app);

connectDB();
let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Backend Server is runing on the port : " + port)
})