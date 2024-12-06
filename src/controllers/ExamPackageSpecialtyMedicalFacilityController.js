import ExamPackageSpecialtyMedicalFacilityService from '../services/ExamPackageSpecialtyMedicalFacilityService'

let createExamPackage = async (req, res) => {
  try {
    let infor = await ExamPackageSpecialtyMedicalFacilityService.createExamPackageService(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Create exam package data fail from server!",
    })
  }
}

let getAllExamPackage = async (req, res) => {
  try {
    let infor = await ExamPackageSpecialtyMedicalFacilityService.getAllExamPackageService(req.query.id);
    return res.status(200).json(
      {
        errCode: 0,
        errMessage: 'Get brief info of medical facility successfully!',
        infor
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Get all exam package information fail from server!",
    })
  }
}

module.exports = {
  createExamPackage: createExamPackage,
  getAllExamPackage: getAllExamPackage,
}