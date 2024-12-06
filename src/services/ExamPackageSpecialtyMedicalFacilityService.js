import db from "../models/index";
require('dotenv').config();
import _ from 'lodash';

let checkRequiredFieldForAPackage = (inputData) => {
  let arrFields = [
    'name',
    'selectedSpecialty',
    'selectedPrice',
    'selectedMedicalFacility',
    'htmlDescription',
    'markdownDescription',
    'htmlCategory',
    'markdownCategory',
    'image',
  ];
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

let createExamPackageService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkRequiredFieldForAPackage(inputData);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameter(s): required information for a Exam package!`
        });
      } else {
        try {
          console.log("Check data: ", inputData.name, inputData.selectedSpecialty, inputData.selectedPrice, inputData.selectedMedicalFacility);
          await db.ExamPackage_specialty_medicalFacility.create({
            name: inputData.name,
            specialtyId: inputData.selectedSpecialty,
            priceId: inputData.selectedPrice,
            medicalFacilityId: inputData.selectedMedicalFacility,
            htmlDescription: inputData.htmlDescription,
            markdownDescription: inputData.markdownDescription,
            htmlCategory: inputData.htmlCategory,
            markdownCategory: inputData.markdownCategory,
            image: inputData.image,
          })

          resolve({
            errCode: 0,
            errMessage: `Create a exam package successfully!`
          });
        } catch (error) {
          reject(error);
        }
      }
    } catch (e) {
      reject(e);
    }
  })
}

let getAllExamPackageService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let packageRes = {};
      if (inputId === 'ALL') {
        packageRes = db.ExamPackage_specialty_medicalFacility.findAll({
          attributes: {
            exclude: ['htmlDescription', 'markdownDescription', 'htmlCategory', 'markdownCategory', 'image', 'createdAt', 'updatedAt']
          },
          include: [
            { model: db.Allcode, as: 'priceDataForPackage', attributes: ['value_Eng', 'value_Vie'] },
          ],
        })
      }
      if (inputId === 'ALLANDIMAGE') {
        packageRes = db.ExamPackage_specialty_medicalFacility.findAll({
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        })
      }
      if (inputId && inputId !== 'ALL' && inputId !== 'ALLANDIMAGE') {
        packageRes = db.ExamPackage_specialty_medicalFacility.findAll({
          where: { id: inputId },
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          },
          include: [
            { model: db.Allcode, as: 'priceDataForPackage', attributes: ['value_Eng', 'value_Vie'] },
          ],
        })
      }
      resolve(packageRes);
    } catch (e) {
      reject(e);
    }
  })
}

module.exports = {
  createExamPackageService: createExamPackageService,
  getAllExamPackageService: getAllExamPackageService,
}