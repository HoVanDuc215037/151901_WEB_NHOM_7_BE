import userService from '../services/userService';

let getWelcome = async (req, res) => {
    let response = userService.hiUserService();
    return res.send({
        response
    });
}

module.exports = {
    getWelcome: getWelcome
}