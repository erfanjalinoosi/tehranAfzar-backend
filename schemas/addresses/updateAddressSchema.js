module.exports = {
    body: {
        type: "object",
        properties: {
            title: {
                type: "string",
            },
            unit: {
                type: "string"
            },
            number: {
                type: "string"
            },
            receiver: {
                type: "object",
                required: ["phoneNumber"],
                properties: {
                    name: {
                        type: "string"
                    },
                    nationalCode: {
                        type: "string"
                    },
                    phoneNumber: {
                        type: "string"
                    }
                }
            },
            postalCode: {
                type: "string"
            },
            description: {
                type: "string"
            },
        },
    }
}
