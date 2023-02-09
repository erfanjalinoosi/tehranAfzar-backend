module.exports = {
    body: {
        type: "object",
        required: ["items", "addressId"],
        properties: {
            items: {
                type: "array",
                items: {
                    type: "object",
                    required: ["id", "count"],
                    properties: {
                        id: {
                            type: "string",
                        },
                        count: {
                            type: "number",
                        }
                    }
                }
            },
            addressId: {
                type: "string"
            },
        },
    }
}
