import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import medicalFacilityController from '../controllers/medicalFacilityController';
import specialtyController from '../controllers/specialtyController'

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
    //lấy tất cả dữ liệu liên quan đến người đang sử dụng hệ thống bằng gamil của họ
    router.get('/api/get-all-relative-infors-of-current-system-user', userController.getAllRelativeInforsOfCurrentSystemUser);
    //lấy tất cả lịch của người dùng hiện tại
    router.get('/api/get-all-relative-bookings-of-current-system-user', userController.getAllRelativeBookingsOfCurrentSystemUser)    
    //tạo thông tin cho một cơ sở y tế
    router.post('/api/create-medical-facility', medicalFacilityController.createMedicalFacility);
    //lấy thông tin trích dẫn của cơ sở y tế
    router.get('/api/get-info-of-medical-facility', medicalFacilityController.getInfoOfMedicalFacility);   

    //lấy ra các bác sĩ nộtr bật cho trang home
    router.get('/api/get-elite-doctor-for-homepage',doctorController.getEliteDoctorForHomePage);
    //lấy ra tất cả bác sĩ để cho vào Select trong trang doctorArticle
    router.get('/api/get-all-doctors-for-doctor-article-page', doctorController.getAllDoctorsForDoctorArticlePage);
    //lưu bài báo của một bác sĩ
    router.post('/api/save-infor-and-article-of-a-doctor', doctorController.saveInforAndArticleOfADoctor);
    //lấy thông tin map từ 2 bảng user và markdown với key=doctorId để hiển thị thông tin bác sĩ
    router.get('/api/get-a-particular-doctor-infor-for-his-or-her-page', doctorController.getParticularInforForDoctorPage);
    //lấy thêm thông tin bác sĩ như địa chỉ phòng khám, giá khám, phương thức thanh toán
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorByID);
    //tạo một schedule cho 1 bac sĩ, một schedule có nhiều timeframe
    router.post('/api/bulk-create-timeframes-for-doctor-appointment-schedule', doctorController.createTimeframesForDoctorSchedule);

    //tạo chuyên khoa mới
    router.post('/api/create-new-specialty', specialtyController.createSpecialty);
    //lấy các chuyên khoa cho trang home
    router.get('/api/get-specialty-for-homepage', specialtyController.getSpecialtyForHomePage);

    return app.use("/", router);
}
module.exports = initWebRoutes;