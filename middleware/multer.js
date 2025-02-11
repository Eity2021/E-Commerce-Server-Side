const multer = require("multer");
const path = require("path");

// Define storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname , "../uploads"),function(err,success){
            if(err){
                throw  err
            }
        } ); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        console.log(cb)
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Define upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
})
// .fields([
//     { name: "images1", maxCount: 1 },
//     { name: "images2", maxCount: 1 },
//     { name: "images3", maxCount: 1 },
//     { name: "images4", maxCount: 1 },
// ]);

module.exports = upload;
