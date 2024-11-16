import db from "../models/index";
require('dotenv').config();
import _, { includes } from 'lodash'

let getEliteDoctorForHomePage = (limitEliteDocter) =>{
    return new Promise( async (resolve,reject) =>{
        try {
            let doctors = await db.User.findAll({
                limit : limitEliteDocter,
                where: {
                    roleId : 'R2',
                },
                order: [['createdAt','DESC']],
                attributes: {
                    exclude: ['password'],
                },
                include: [
                    {model : db.Allcode, as: 'positionData',attributes:['value_Eng','value_Vie']},
                    {model : db.Allcode, as: 'genderData',attributes:['value_Eng','value_Vie']},
                ],
                raw: true,
                nest: true,
            })
            resolve({
                errCode: 0,
                date: doctors,
            })

        } catch (e) {
            reject(e)
        }
    })
}

let getAllDoctorsForDoctorArticlePage = () =>{
    return new Promise( async (resolve,reject) =>{
        try {
            let doctors = await db.User.findAll({
                where: {
                    roleId : 'R2',
                },
                attributes: {
                    exclude: ['password'],
                },
                raw: true,
                nest: true,
            })
            resolve({
                errCode: 0,
                date: doctors,
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    getEliteDoctorForHomePage : getEliteDoctorForHomePage, 
    getAllDoctorsForDoctorArticlePage: getAllDoctorsForDoctorArticlePage
}