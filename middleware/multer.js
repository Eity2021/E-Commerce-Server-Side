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
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp","image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

// Define upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter,
});

// Export upload functions
module.exports = {
    singleUserUpload: upload.single("user_image"),
    singleUpload: upload.single("categories_image"),
    subSingleUpload: upload.single("subCategories_image"), 
    multipleUpload: upload.array("image", 5), 
    multipleMainBannerUpload: upload.array("mainBanner", 15), 
};


