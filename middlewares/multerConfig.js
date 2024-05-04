const multer = require('multer');

const nosTypesMimes = {
    "image/jpg" :  "jpg",
    "image/jpeg" : "jpeg",
    "image/png " : "png",
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        const extension = nosTypesMimes [file.mimetype];

        console.log(extension);

        const name = file.originalname.split("." + extension).join("_");

        console.log(name);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 19) + "." + extension;

        console.log(uniqueSuffix);

        cb(null, name + uniqueSuffix);
    },
});

module.exports = multer({ storage: storage }).single("image");