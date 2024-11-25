import doctorService from "../services/doctorService"

let getEliteDoctorForHomepage = async (req,res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try {
        let response = await doctorService.getEliteDoctorForHomePage(+limit);// Thêm dấu cộng để convert KDL sang int
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode : -1,
            message: 'Get elite doctor error from server!'
        })
    }
}

let getAllDoctorsForDoctorArticlePage = async(req,res) => {
    try {
        let response = await doctorService.getEliteDoctorForHomePage();
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode : -1,
            message: 'Get doctor for article page error from server!'
        })
    }
}

let saveInforAndArticleOfADoctor = async(req,res) => {
    try {
        let response = await doctorService.saveInforAndArticleOfADoctor(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode : -1,
            message: 'Save doctor infor and article error!'
        })
    }
}

let getParticularInforForDoctorPage = async(req,res) => {
    try {
        let response = await doctorService.getParticularInforForDoctorPage(req.query.id);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode : -1,
            message: 'Get particular doctor infor error from server!'
        })
    }
}

let getExtraInforDoctorByID = async (req, res) => {
    try {
        let response = await doctorService.getExtraInforDoctorByID(req.query.doctorId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Get extra infor doctor error from server!'
        })
    }
}
let createTimeframesForDoctorSchedule = async (req, res) => {
    try {
        let response = await doctorService.bulkCreateTimeframesForDoctorService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Create timeframes for Doctor schedule fail from server!",
        })
    }
}
module.exports = {
    getEliteDoctorForHomePage: getEliteDoctorForHomepage,
    getAllDoctorsForDoctorArticlePage : getAllDoctorsForDoctorArticlePage,
    saveInforAndArticleOfADoctor : saveInforAndArticleOfADoctor,
    getParticularInforForDoctorPage : getParticularInforForDoctorPage,
    getExtraInforDoctorByID : getExtraInforDoctorByID,
    createTimeframesForDoctorSchedule: createTimeframesForDoctorSchedule
}