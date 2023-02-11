module.exports = {
    body: {
        type: "object",
        properties: {
            username: {
                type: "string"
            },
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            birthday: {
                type: "string",
                format: "date"
            },
            phoneNumber: {
                type: "string"
            },
            landLineNumber: {
                type: "string"
            },
            nationalCode: {
                type: "string"
            },
            password: {
                minLength: 8,
                type: "string"
            },
            passwordConfirmation: {
                type: "string",
            }
        },
    }
}
