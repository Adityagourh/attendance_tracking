let joi = require('joi');
let { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const schema = {
    createEmplyee: joi 
    .object({
        empName: joi
        .string()
        .min(3)
        .max(50)
        .message({
            "String.min": "{#label} should contain atleast {#limit} charecters",
            "String.max": "{#label} should contain atleast {#limit} charecters"
        })
        .required(),
        empPassword: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .messages({
            "password.minOfUppercase":
            "{#label} should contain at least {#min} uppercase character",
            "password.minOfSpecialCharacters":
            "{#label} should contain at least {#min} special character",
            "password.minOfLowercase":
            "{#label} should contain at least {#min} lowercase character",
            "password.minOfNumeric":
            "{#label} should contain at least {#min} numeric character",
            "password.noWhiteSpaces": "{#label} should not contain white spaces",
            "password.onlyLatinCharacters":
            "{#label} should contain only latin characters",
        })
        .required(),
        empEmail: joi
        .string()
        .email()
        .message("Invalid email address")
        .required(),

        empPhone: joi
        .number()
        .integer()
        .min(100000000)
        .max(9999999999)
        .message("invalid mobile number")
        .required(),
        empGender: joi.string().required(),
        empCity: joi.string().required(),
    })
    .unknown(true),

    //--------login validation---------
   loginEmpValidation: joi
   .object({
     empEmail: joi
       .string()
       .email()
       .message("invalid email address")
       .required(),
     empPassword: joi.string().required(),
   })
   .unknown(true),

}
module.exports = schema