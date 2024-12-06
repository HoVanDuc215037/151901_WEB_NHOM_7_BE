import ExamPackageScheduleService from '../services/ExamPackageScheduleService';

let createTimeframesForExamPackageSchedule = async (req, res) => {
    try {
        let response = await ExamPackageScheduleService.bulkCreateTimeframesForExamPackageScheduleService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Create timeframes for Doctor schedule fail from server!",
        })
    }
}

let getPackageScheduleByDate = async (req, res) => {
    try {
        console.log("Check parameter: ", req.query.packageId, req.query.date);
        let response = await ExamPackageScheduleService.getPackageScheduleByDateService(req.query.packageId, req.query.date);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Get schedule by date for a package error from server!',
        })
    }
}

module.exports = {
    createTimeframesForExamPackageSchedule: createTimeframesForExamPackageSchedule,
    getPackageScheduleByDate: getPackageScheduleByDate,
}