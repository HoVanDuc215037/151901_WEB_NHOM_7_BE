import specialtyService from "../services/specialtyService"

let createSpecialty = async (req,res) => {
    try {
        let response = await specialtyService.createSpecialtyService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode : -1,
            errMessage : 'create specailty error!'
        })
       
    }
}

let getSpecialtyForHomePage = async (req,res) => {
    try {
        let response = await specialtyService.getSpecialtyForHomePageService();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode : -1,
            errMessage : 'Get specailty for homepage error!'
        })
       
    }
}

let getSpecialtyAndProvinceForMedicalFacilityManagePage = async (req,res) => {
    try {
        let response = await specialtyService.getSpecialtyAndProvinceForMedicalFacilityManagePageService();
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode : -1,
            errMessage : 'Get specialty detail error from server!'
        })
    }
}

let getSpecialtyById = async (req,res) => {
    try {
        let response = await specialtyService.getSpecialtyByIdService(req.query.id,req.query.location);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode : -1,
            errMessage : 'Get specialty error from server!'
        })
    }
}

module.exports = {
    createSpecialty : createSpecialty,
    getSpecialtyForHomePage : getSpecialtyForHomePage,
    getSpecialtyAndProvinceForMedicalFacilityManagePage : getSpecialtyAndProvinceForMedicalFacilityManagePage,
    getSpecialtyById : getSpecialtyById,
}