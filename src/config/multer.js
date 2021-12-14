const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
    storage: multer.diskStorage({
        destination: (request, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (request, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) 
                    cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`
                cb(null, filename);
            });
        }
    }),
    fileFilter: (request, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/png",
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    }
};