const mainBannerModel = require("../../models/bannerModel");
const { v4: uuidv4 } = require("uuid");




const mainBanners = async (req, res) => {
  try {
    var arrImagesBanner = req?.files?.map((file) => ({
      id: uuidv4(),
      filename:file?.filename
    }));
  console.log( "arrImagesBanner", arrImagesBanner)
    if (!arrImagesBanner.length) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "No images provided",
      });
    }

    const existingBanners = await mainBannerModel.findOne();

    if (existingBanners) {
      if (existingBanners.mainBanner.length + arrImagesBanner.length > 15) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "Cannot add more than 15 images",
        });
      }
      existingBanners.mainBanner.push(...arrImagesBanner);
    await existingBanners.save();

    return res.status(201).json({
      code: 201,
      success: true,
      message: "Images added to main banner",
      data: existingBanners,
    });

    } else {

      const newBanner = new mainBannerModel({ mainBanner: arrImagesBanner });
      await newBanner.save();

      return res.status(201).json({
        code: 201,
        success: true,
        message: "Successfully added main banner",
        data: newBanner,
      });

    }

    

  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server error",
    });
  }
};


const deleteMainBannerImage = async (req, res) => {
  try {
    const { imageId } = req.params;
   console.log("imageId", imageId )
    if (!imageId) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Image ID is required",
      });
    }

    const existingBanners = await mainBannerModel.findOne();

    if (!existingBanners) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "No banner found",
      });
    }


    const updatedImages = existingBanners.mainBanner.filter(
      (image) => image.id !== imageId
    );


    if (updatedImages.length === existingBanners.mainBanner.length) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Image not found",
      });
    }


    existingBanners.mainBanner = updatedImages;
    await existingBanners.save();

    return res.status(200).json({
      code: 200,
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};



const mainBannerLists = async (req, res) => {
  const mainBannerList = await mainBannerModel.find({});

  if (!mainBannerList) {
    return res.status(404).json({
      code: 404,
      success: false,
      message: "Banner not found",
    });
  }
  res.status(200).json({
    code: 200,
    success: true,
    message: "Banner list List fetched",
    mainBannerList,
  });
};
module.exports = {
  mainBanners,
  mainBannerLists,
  deleteMainBannerImage
};
