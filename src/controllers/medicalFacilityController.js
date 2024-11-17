import medicalFacilityService from "../services/medicalFacilityService";

let check = async (req, res) => {
    const test = medicalFacilityService.checkService();
    return res.send(test);

}

module.exports = {
    check: check
}