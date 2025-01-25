const validator = require("./validator");

const validateProphet = (req, res, next) => {
    const validationRules = {
        firstName: "required|string",
        lastName: "required|string",
        birthday: "required|string",
        studies:"required|string",
        wifeName: "required|string"
    };
    validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err
            })
        } else {
            next()
        }
    });
}

module.exports = { validateProphet };