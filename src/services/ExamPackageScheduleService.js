import db from "../models/index";
import bcrypt from 'bcryptjs';
import moment from "moment";
require('dotenv').config();
import _ from 'lodash';

let bulkCreateTimeframesForExamPackageScheduleService = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.scheduleArr || !inputData.examPackageId || !inputData.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters: timeframe data!',
                })
            } else {
                let availableTimeframe = inputData.scheduleArr;
                if (availableTimeframe && availableTimeframe.length > 0) {
                    availableTimeframe.map(item => {
                        item.maxNumber = MAX_NUMBER_CAN_USE_PACKAGE;
                        return item;
                    })
                }

                //kiểm tra timeframe của một gói khám đã tồn tại
                let existing = await db.ExamPackageSchedule.findAll({
                    where: { examPackageId: inputData.examPackageId, date: inputData.formatedDate },
                    attributes: ['timeType', 'date', 'examPackageId', 'maxNumber'],
                    raw: true,
                })

                if (existing && existing.length > 0) {
                    existing = existing.map(item => {
                        item.date = new Date(item.date).getTime();
                        return item;
                    })
                }

                //compare to find differences
                let needAdding = _.differenceWith(availableTimeframe, existing, (a, b) => {
                    return a.timeType === b.timeType && a.date === b.date;
                })

                //đổi trường id của needAdding sang examPackageId vì thế mới có thể lưu nếu không sẽ bị trùng với id của bảng
                needAdding = needAdding.map(item => {
                    const { id, ...rest } = item; // Bỏ trường id
                    return { ...rest, examPackageId: inputData.examPackageId }; // Thêm examPackageId
                });
                // create
                if (needAdding && needAdding.length > 0) {
                    await db.ExamPackageSchedule.bulkCreate(needAdding);
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Create available time for package successfully!',
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getPackageScheduleByDateService = (packageId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!packageId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter: packageId or date!',
                })
            } else {
                // let formattedDate = moment(Number(date)).format('YYYY-MM-DD 00:00:00');
                // console.log("Check formatted date: ", date, "type of date: ", typeof date);
                let numberDate = Number(date);
                // console.log("Check number date (number): ", numberDate, "type of date: ", typeof numberDate);
                // console.log("Check formatted date (number): ", formattedDate, "type of date: ", typeof formattedDate);
                let scheduleData = await db.ExamPackageSchedule.findAll({
                    where: {
                        examPackageId: packageId,
                        date: numberDate,
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeDataForPackage', attributes: ['value_Eng', 'value_Vie'] },
                    ],
                    raw: false,
                    nest: true,
                });

                // console.log("Check schedule data: ", scheduleData);
                if (!scheduleData) {
                    scheduleData = ["no schedule"];
                }

                resolve({
                    errCode: 0,
                    errMessage: "Get exam package schedule successfully!",
                    data: scheduleData,
                })
            }
        } catch (e) {

        }
    })
}

module.exports = {
    bulkCreateTimeframesForExamPackageScheduleService: bulkCreateTimeframesForExamPackageScheduleService,
    getPackageScheduleByDateService: getPackageScheduleByDateService,
}