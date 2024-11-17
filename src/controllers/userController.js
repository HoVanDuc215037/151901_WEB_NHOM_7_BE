import userService from '../services/userService';

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    });
}

let handleCreateNewUserInReact = async (req, res) => {
    let message = await userService.createNewUserInReact(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let checkEmailWetherAlreadyExist = async (req, res) => {
    let alreadyExist = await userService.checkUserEmail(req.query.email);
    return res.status(200).json(alreadyExist);
}

let handleGetAllUsersForReact = async (req, res) => {
    let id = req.query.id;  //all || id
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            users: []
        });
    }
    let users = await userService.getAllUsersForReact(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Get user(s) from Database successfully',
        users,
    });
}

let handleEditUserInReact = async (req, res) => {
    let data = req.body;
    let message = await userService.editUserInReact(data);
    return res.status(200).json(message);
}

let handleDeleteUserInReact = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: `Mising required parameters! Maybe need deleted user's id is missing`,
        })
    }
    let message = await userService.deleteUserInReact(req.body.id);
    return res.status(200).json(message);
}

let getAllCodesData = async (req, res) => {
    try {
        let data = await userService.getAllCodesDataService(req.query.type);
        return res.status(200).json(data);
    } catch (e) {
        console.log(`Get AllCodes's data error: `, e)
        return res.status(200).json({
            errCode: -1,
            errMessage: `Error of getting AllCodes's data from server`,
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleCreateNewUserInReact: handleCreateNewUserInReact,
    checkEmailWetherAlreadyExist: checkEmailWetherAlreadyExist,
    handleGetAllUsersForReact: handleGetAllUsersForReact,
    handleEditUserInReact: handleEditUserInReact,
    handleDeleteUserInReact: handleDeleteUserInReact,
    getAllCodesData: getAllCodesData
}