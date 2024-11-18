import { reject } from "lodash";
import db from "../models/index";
require('dotenv').config();

let createSpecialtyService = (inputData) => {
    return new Promise (async (resolve, reject) => {
        try {
            if(!inputData.name || !inputData.imageBase64 || !inputData.htmlDescription || !inputData.markdownDescription){
                resolve({
                    errCode : 1,
                    errMessage : 'Missing parameter',
                })
            }else{
                await db.Specialty.create({
                    name: inputData.name,
                    htmlDescription: inputData.htmlDescription,
                    markdownDescription: inputData.markdownDescription,
                    specialtyImage: inputData.imageBase64,
                })
            }
            resolve({
                errCode : 0,
                errMessage : 'Create new specialty successfully!',
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getSpecialtyForHomePageService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = await db.Specialty.findAll({
                
                order: [['createdAt', 'ASC']],
            
                raw: true,
            })
            resolve({
                errCode: 0,
                data: specialties,
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createSpecialtyService : createSpecialtyService,
    getSpecialtyForHomePageService : getSpecialtyForHomePageService
}