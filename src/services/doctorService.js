import db from "../models/index";
require('dotenv').config();
import _, { includes, reject } from 'lodash'

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

let checkRequiredField = (inputData) => {
    let arrFields = ['doctorId', 'htmlContent', 'markdownContent', 'action', 'selectedPrice', 'selectedPaymentMethod',
        'selectedProvince', 'clinicName', 'clinicAddress', 'note', 'specialtyId', 'selectedMedicalFacility'];
    let isValid = true;
    let element = '';
    for (let i = 0; i < arrFields.length; i++) {
        if (!inputData[arrFields[i]]) {
            isValid = false;
            element = arrFields[i];
            break;
        }
    }
    return {
        isValid: isValid,
        element: element,
    }
}
let saveInforAndArticleOfADoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {

            let checkObj = checkRequiredField(inputData);
            if (checkObj.isValid === false) {
                resolve({
                    errCode: 1,
                    errMesage: 'Missing parameters!',
                })
            } else {
                //upsert to Markdown
                if (inputData.action === 'CREATE') {
                    await db.ArticleMarkdown.create({
                        htmlContent: inputData.htmlContent,
                        markdownContent: inputData.markdownContent,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                    })
                } else if (inputData.action === 'EDIT') {
                    let needEdittingDoctorArticle = await db.ArticleMarkdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false,
                    })
                    if (needEdittingDoctorArticle) {
                        needEdittingDoctorArticle.htmlContent = inputData.htmlContent;
                        needEdittingDoctorArticle.markdownContent = inputData.markdownContent;
                        needEdittingDoctorArticle.description = inputData.description;
                        await needEdittingDoctorArticle.save();
                    }
                }

                //upsert to Doctor_infor table in DB
                let doctorInfor = await db.Doctor_infor.findOne({
                    where: { doctorId: inputData.doctorId },
                    raw: false,
                })
                if (doctorInfor) {
                    //update
                    doctorInfor.doctorId = inputData.doctorId;
                    doctorInfor.priceId = inputData.selectedPrice;
                    doctorInfor.provinceId = inputData.selectedProvince;
                    doctorInfor.paymentId = inputData.selectedPaymentMethod;
                    doctorInfor.clinicAddress = inputData.clinicAddress;
                    doctorInfor.clinicName = inputData.clinicName;
                    doctorInfor.note = inputData.note;
                    doctorInfor.specialtyId = inputData.specialtyId;
                    doctorInfor.clinicId = inputData.clinicId;
                    await doctorInfor.save();
                } else {
                    //create
                    await db.Doctor_infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPaymentMethod,
                        clinicAddress: inputData.clinicAddress,
                        clinicName: inputData.clinicName,
                        note: inputData.note,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId,
                    })
                }

                if (inputData.selectedMedicalFacility) {
                    if (inputData.action === 'CREATE') {
                        // Tạo mới bản ghi
                        await db.Doctor_specialty_medicalFacility.create({
                            doctorId: inputData.doctorId,
                            specialtyId: inputData.specialtyId,
                            medicalFacilityId: inputData.selectedMedicalFacility,
                        });
                    } else if (inputData.action === 'EDIT') {
                        // Tìm và cập nhật bản ghi
                        let doctorMedicalFacility = await db.Doctor_specialty_medicalFacility.findOne({
                            where: {
                                doctorId: inputData.doctorId,
                                specialtyId: inputData.specialtyId
                            },
                            raw: false,
                        });
                        if (doctorMedicalFacility) {
                            doctorMedicalFacility.medicalFacilityId = inputData.selectedMedicalFacility;
                            await doctorMedicalFacility.save();
                        } else {
                            // Nếu không tìm thấy, tạo mới bản ghi
                            await db.Doctor_specialty_medicalFacility.create({
                                doctorId: inputData.doctorId,
                                specialtyId: inputData.specialtyId,
                                medicalFacilityId: inputData.selectedMedicalFacility,
                            });
                        }
                    }
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save article for doctor successfully!',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getParticularInforForDoctorPage = (inputDoctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputDoctorId) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameter(s)!",
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputDoctorId
                    },
                    attributes: {
                        exclude: ['password'],
                    },
                    include: [
                        { model: db.ArticleMarkdown, attributes: ['htmlContent', 'markdownContent', 'description'] },
                        { model: db.Allcode, as: 'positionData', attributes: ['value_Eng', 'value_Vie'] },

                        {
                            model: db.Doctor_infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['value_Eng', 'value_Vie'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['value_Eng', 'value_Vie'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['value_Eng', 'value_Vie'] },
                                { model: db.Specialty, as: 'belongToSpecialty', attributes: ['name'] }
                            ]
                        },
                        {
                            model: db.Doctor_specialty_medicalFacility,
                            attributes: {
                                exclude: ['id', 'createdAt', 'updatedAt']
                            },
                            include: [
                                {
                                    model: db.ComplexMedicalFacility,
                                    as: 'medicalFacilityDoctorAndSpecialty',
                                    attributes: ['id', 'name']
                                }
                            ]
                        }

                    ],
                    raw: false,
                    nest: true,
                })

                if (data && data.image) {
                    data.image = Buffer.from(data.image, 'base64').toString('binary');
                }

                if (!data) data = {};

                resolve({
                    errCode: 0,
                    data: data,
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}


let getExtraInforDoctorByID = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameter: doctorId',
                })
            } else {
                let data = await db.Doctor_infor.findOne({
                    where: { doctorId: inputId },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['value_Eng', 'value_Vie'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['value_Eng', 'value_Vie'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['value_Eng', 'value_Vie'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) {
                    data = {};
                }
                resolve({
                    errCode: 0,
                    data: data,
                })
            }
        } catch (e) {
            reject(e);
        }
    })

}

module.exports = {
    getEliteDoctorForHomePage : getEliteDoctorForHomePage, 
    getAllDoctorsForDoctorArticlePage: getAllDoctorsForDoctorArticlePage,
    saveInforAndArticleOfADoctor : saveInforAndArticleOfADoctor,
    getParticularInforForDoctorPage: getParticularInforForDoctorPage,
    getExtraInforDoctorByID : getExtraInforDoctorByID
}