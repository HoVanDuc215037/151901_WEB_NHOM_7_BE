import { response } from "express";
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

module.exports = {
    getEliteDoctorForHomePage: getEliteDoctorForHomepage,
    getAllDoctorsForDoctorArticlePage : getAllDoctorsForDoctorArticlePage
}