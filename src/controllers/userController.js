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

module.exports = {
    handleLogin: handleLogin,
    handleCreateNewUserInReact: handleCreateNewUserInReact,
    checkEmailWetherAlreadyExist: checkEmailWetherAlreadyExist
}