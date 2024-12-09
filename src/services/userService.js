import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10); //dùng byscript băm user password

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {

            }
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,

                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Login succesfully';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = 'Wrong pasword';
                    }
                } else {
                    userData.errCode = 1;
                    userData.errMessage = `User not found`;
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = `User not found`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail,
                    password: { [db.Sequelize.Op.ne]: '' }
                }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUserInReact = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'User has already been exist!',
                });
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                let existingUser = await db.User.findOne({
                    where: { email: data.email }
                });

                if (existingUser) {
                    // Nếu người dùng đã tồn tại, cập nhật thông tin
                    await db.User.update({
                        password: hashPasswordFromBcrypt,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        image: data.image, // Có thể cập nhật image
                        roleId: data.roleId,
                        positionId: data.positionId,
                    }, {
                        where: { email: data.email }
                    });

                    resolve({
                        errCode: 0,
                        message: 'Update user successfully!',
                    });
                } else {
                    // Nếu người dùng không tồn tại, tạo mới
                    await db.User.create({
                        email: data.email,
                        password: hashPasswordFromBcrypt,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        gender: data.gender,
                        image: data.image, // Gán giá trị cho image
                        roleId: data.roleId,
                        positionId: data.positionId,
                    });

                    resolve({
                        errCode: 0,
                        message: 'Create user successfully!',
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsersForReact = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId }, attributes: {
                        exclude: ['password']
                    }
                })
            }

            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let editUserInReact = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing parameters!',
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                if (data.image) {
                    user.image = data.image;
                }
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'User updated!',
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User is not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUserInReact = (userIdFromReact) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userIdFromReact },
                raw: false,
            });
            console.log(user);
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: 'User is not exist!'
                })
            } else {
                await user.destroy();
                resolve({
                    errCode: 0,
                    message: 'User has been deleted successfully'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllCodesDataService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                });
            } else {
                let res = {};
                let allCodesData = await db.Allcode.findAll({
                    where: { type: typeInput },
                });
                res.errCode = 0;
                res.data = allCodesData;
                resolve(res);
            }


        } catch (e) {
            reject(e);
        }
    })
}

let getAllRelativeInforsOfCurrentSystemUserService = (currentUserEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!currentUserEmail) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameter: current user email!',
                });
            } else {
                let res = {};
                let userInUserTable = await db.User.findOne({
                    where: { email: currentUserEmail },
                    attributes: {
                        exclude: ['password', 'id', 'createdAt', 'updatedAt']
                    },
                    include: [
                        {
                            model: db.Allcode, as: 'roleData',
                            attributes: ['value_Eng', 'value_Vie']
                        },
                        {
                            model: db.Allcode, as: 'positionData',
                            attributes: ['value_Eng', 'value_Vie']
                        },
                        {
                            model: db.Allcode, as: 'genderData',
                            attributes: ['value_Eng', 'value_Vie']
                        },
                        {
                            model: db.Doctor_infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                {
                                    model: db.Specialty, as: 'belongToSpecialty',
                                    attributes: ['name']
                                },
                            ]
                        },
                    ]
                });

                if (userInUserTable) {
                    // Format lại các trường date và patientBirthday
                    if (userInUserTable.doctorHasAppointmentWithPatients) {
                        userInUserTable.doctorHasAppointmentWithPatients.forEach(appointment => {
                            appointment.date = moment(appointment.date).format('YYYY-MM-DD');
                            appointment.patientBirthday = moment(appointment.patientBirthday).format('YYYY-MM-DD');
                        });
                    }

                    if (userInUserTable.patientHasAppointmentWithDoctors) {
                        userInUserTable.patientHasAppointmentWithDoctors.forEach(appointment => {
                            appointment.date = moment(appointment.date).format('YYYY-MM-DD');
                            appointment.patientBirthday = moment(appointment.patientBirthday).format('YYYY-MM-DD');
                        });
                    }
                }

                res.errCode = 0;
                res.errMessage = 'Get current user informations successfully!';
                res.data = userInUserTable;

                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    });
}

let getAllRelativeBookingsOfCurrentSystemUserService = (currentUserEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!currentUserEmail) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing input parameter: current user email!',
                });
            } else {
                let res = {};
                let allBookingsOfCurrentUser = await db.User.findOne({
                    where: { email: currentUserEmail },
                    attributes: {
                        exclude: ['password', 'id', 'createdAt', 'updatedAt', 'firstName', 'lastName', 'address', 'gender', 'phoneNumber', 'image', 'roleId', 'positionId']
                    },
                    include: [
                        {
                            model: db.Booking, as: 'doctorHasAppointmentWithPatients',
                            attributes: ['id', 'statusId', 'timeType', 'doctorId', 'patientId', 'date', 'patientPhoneNumber', 'patientAddress', 'patientBirthday', 'patientGender'],
                            include: [
                                {
                                    model: db.Allcode, as: 'appointmentTimeTypeData',
                                    attributes: ['value_Vie', 'value_Eng']
                                },
                            ]
                        },
                        {
                            model: db.Booking, as: 'patientHasAppointmentWithDoctors',
                            attributes: ['id', 'statusId', 'timeType', 'doctorId', 'patientId', 'date', 'patientPhoneNumber', 'patientAddress', 'patientBirthday', 'patientGender'],
                            include: [
                                {
                                    model: db.Allcode, as: 'appointmentTimeTypeData',
                                    attributes: ['value_Vie', 'value_Eng']
                                },
                            ]
                        },
                    ]
                });
                res.errCode = 0;
                res.errMessage = 'Get current user bookings successfully!';
                res.data = allBookingsOfCurrentUser;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    createNewUserInReact: createNewUserInReact,
    getAllUsersForReact: getAllUsersForReact,
    editUserInReact: editUserInReact,
    deleteUserInReact: deleteUserInReact,
    getAllCodesDataService: getAllCodesDataService,
    getAllRelativeInforsOfCurrentSystemUserService: getAllRelativeInforsOfCurrentSystemUserService,
    getAllRelativeBookingsOfCurrentSystemUserService: getAllRelativeBookingsOfCurrentSystemUserService
}