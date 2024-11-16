import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/api/login', userController.handleLogin);
    router.post('/api/create-new-user-in-react', userController.handleCreateNewUserInReact);
    router.get('/api/check-user-email-already-exist', userController.checkEmailWetherAlreadyExist);    

    //lấy ra các bác sĩ nộtr bật cho trang home
    router.get('/api/get-elite-doctor-for-homepage',doctorController.getEliteDoctorForHomePage);
    //lấy ra tất cả bác sĩ để cho vào Select trong trang doctorArticle
    router.get('/api/get-all-doctors-for-doctor-article-page', doctorController.getAllDoctorsForDoctorArticlePage);

    return app.use("/", router);
}
module.exports = initWebRoutes;