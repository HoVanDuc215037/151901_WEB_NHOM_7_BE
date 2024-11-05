import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/api/login', userController.handleLogin);
    router.post('/api/create-new-user-in-react', userController.handleCreateNewUserInReact);
    router.get('/api/check-user-email-already-exist', userController.checkEmailWetherAlreadyExist);    

    return app.use("/", router);
}
module.exports = initWebRoutes;