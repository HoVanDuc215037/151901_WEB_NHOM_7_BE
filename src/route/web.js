import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import medicalFacilityController from '../controllers/medicalFacilityController';

let router = express.Router();

let initWebRoutes = (app) => {
    //đăng nhập
    router.post('/api/login', userController.handleLogin);
    //tạo người dùng
    router.post('/api/create-new-user-in-react', userController.handleCreateNewUserInReact);
    //kiểm tra email của người dùng
    router.get('/api/check-user-email-already-exist', userController.checkEmailWetherAlreadyExist);    
    //lấy thông tin của tất cả người dùng
    router.get('/api/get-all-users-for-react', userController.handleGetAllUsersForReact);
    //cập nhật thông tin một người dùng
    router.put('/api/edit-user-in-react', userController.handleEditUserInReact);
    //xóa một người dùng
    router.delete('/api/delete-user-in-react', userController.handleDeleteUserInReact);
    //lấy allcode
    router.get('/api/getallcodesdata', userController.getAllCodesData);
    router.get('/api/check-medical', medicalFacilityController.check);//check
    

    //lấy ra các bác sĩ nộtr bật cho trang home
    router.get('/api/get-elite-doctor-for-homepage',doctorController.getEliteDoctorForHomePage);
    //lấy ra tất cả bác sĩ để cho vào Select trong trang doctorArticle
    router.get('/api/get-all-doctors-for-doctor-article-page', doctorController.getAllDoctorsForDoctorArticlePage);

    return app.use("/", router);
}
module.exports = initWebRoutes;