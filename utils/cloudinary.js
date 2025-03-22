const { v2: cloudinary } = require("cloudinary");

// Configuration
cloudinary.config({
  cloud_name: "dwhlpj3ex",
  api_key: "692323611441134",
  api_secret: "wZ9EEX8nxWAhzw6y25qUzoVdGgI",
});

// Upload an image

const uploadImageFile = async (image) => {
  const uploadResult = await cloudinary.uploader
    .upload(image, {
      public_id: "",
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log("uploadResult",uploadResult);
  return uploadResult;
};

// Optimize delivery by resizing and applying auto-format and auto-quality
const optimizeUrl = cloudinary.url("trendyCart", {
  fetch_format: "auto",
  quality: "auto",
});

console.log(optimizeUrl);

// Transform the image: auto-crop to square aspect_ratio
const autoCropUrl = cloudinary.url("trendyCart", {
  crop: "auto",
  gravity: "auto",
  // width: 500,
  // height: 500,
});

// console.log(autoCropUrl);

module.exports = uploadImageFile;
