const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        version: "1.0.0",
        title: "Todo API",
        description: "Documentation for the Todo API"
    },
    host: "localhost:3000",
    schemes: ["http"],
    definitions: {
        User: {
            name: "John Doe",
            email: "john@example.com",
            password: "yourpassword"
        },
        Login: {
            email: "john@example.com",
            password: "yourpassword"
        },
        Todo: {
            name: "Buy groceries",
            description: "Milk, bread, eggs",
            CategoryId: 1
        },
        Category: {
            name: "Work"
        }
    },
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description: "Enter your bearer token in the format **Bearer <token>"
        }
    },
    security: [{ Bearer: [] }]
};

const outputFile = "./swagger-output.json"
const endpointsFile = ["./app.js"]

swaggerAutogen(outputFile, endpointsFile, doc).then(() => {
    require("./bin/www")
})