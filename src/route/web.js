import express from "express";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/hello', (req, res) => {
        res.send("G7: Hello");
    });

    return app.use("/", router);
}
module.exports = initWebRoutes;