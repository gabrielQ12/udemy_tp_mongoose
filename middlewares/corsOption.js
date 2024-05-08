const cors = require('cors');

const corsOption = {
    "origin": "*",
    "method": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

module.exports = cors(corsOption);