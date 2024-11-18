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

module.exports = {
    createSpecialty : createSpecialty,
    getSpecialtyForHomePage : getSpecialtyForHomePage   
}