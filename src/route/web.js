import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import medicalFacilityController from '../controllers/medicalFacilityController';
import specialtyController from '../controllers/specialtyController'
import patientController from "../controllers/patientController";
import ExamPackageScheduleController from "../controllers/ExamPackageScheduleController";
import ExamPackageSpecialtyMedicalFacilityController from "../controllers/ExamPackageSpecialtyMedicalFacilityController";

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
    //lưu bệnh nhân và thông tin đặt lịch khám với bác sĩ
    router.post('/api/patient-infor-when-booking-time', patientController.patientInforWhenBookingTime);
    //trang web xác nhận chốt đặt lịch
    router.post('/api/confirm-booking-appointment', patientController.confirmBookingAppointment);
    //tạo mới một gói khám cho một cơ sở y tế
    router.post('/api/create-exam-package', ExamPackageSpecialtyMedicalFacilityController.createExamPackage);
    //lấy thông tin tất cả các Gói khám
    router.get('/api/get-all-exam-package', ExamPackageSpecialtyMedicalFacilityController.getAllExamPackage);

    //lấy ra các bác sĩ nộtr bật cho trang home
    router.get('/api/get-elite-doctor-for-homepage', doctorController.getEliteDoctorForHomePage);
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
    //lấy khung giờ khám cho từng ngày của một bác sĩ
    router.get('/api/get-doctor-schedule-by-date', doctorController.getScheduleByDate);
    //lưu thông tin cuộc hẹn vào bảng history
    router.post('/api/save-appointment-history', doctorController.saveAppointmentHistory);
    //lấy thông tin trong bảng history
    router.get('/api/get-appointement-histories-by-doctor-email', doctorController.getAppointmentHistoriesByDoctorEmail);

    //tạo chuyên khoa mới
    router.post('/api/create-new-specialty', specialtyController.createSpecialty);
    //lấy các chuyên khoa cho trang home
    router.get('/api/get-specialty-for-homepage', specialtyController.getSpecialtyForHomePage);
    //lấy một số trường của các specialties cho trang tạo cơ sở y tế (để đỡ nghẽn mạng)
    router.get('/api/get-specialty-and-province-for-medical-facility-manage-page', specialtyController.getSpecialtyAndProvinceForMedicalFacilityManagePage);
    //lấy dữ liệu cho trang specialty details, bao gồm thông tin của specialty và bác sĩ
    router.get('/api/get-specialty-by-id', specialtyController.getSpecialtyById);

    //tạo lịch khám cho gói khám
    router.post('/api/bulk-create-timeframes-for-exam-package-schedule', ExamPackageScheduleController.createTimeframesForExamPackageSchedule);
    //lấy các khung giờ khám của một gói khám
    router.get('/api/get-package-schedule-by-date', ExamPackageScheduleController.getPackageScheduleByDate);

    return app.use("/", router);
}
module.exports = initWebRoutes;