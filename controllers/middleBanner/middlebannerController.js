const { v4: uuidv4 } = require("uuid");
const middleBannerModel = require("../../models/middleBannerModel");

const addMiddleBanner = async (req, res) => {
  try {
    const arrImagesMiddleBanner = req?.files?.map((file) => ({
      id: uuidv4(),
      filename: file?.filename,
    }));
    console.log("arrImagesMiddleBanner", arrImagesMiddleBanner);

    if (!arrImagesMiddleBanner) {
      res.status(400).json({
        code: 400,
        success: false,
        message: "No images provided",
      });
    }

    const existingMiddleBanner = await middleBannerModel.findOne();

    if (existingMiddleBanner) {
      if (
        existingMiddleBanner.middleBanner.length +
          arrImagesMiddleBanner.length >
        15
      ) {
        return res.status(400).json({
          code: 400,
          success: true,
          message: "cannot add more than 15 images",
        });
      }

      existingMiddleBanner.middleBanner.push(...arrImagesMiddleBanner);
      await existingMiddleBanner.save();
      console.log("existingMiddleBanner", existingMiddleBanner);

      return res.status(201).json({
        code: 201,
        success: true,
        message: "Images added to middle banner",
        data: existingMiddleBanner,
      });
    } else {
      const newMiddleBanner = new middleBannerModel({
        middleBanner: arrImagesMiddleBanner,
      });
      await newMiddleBanner.save();
      console.log("newMiddleBanner", newMiddleBanner);
      return res.status(201).json({
        code: 201,
        success: true,
        message: "Successfully added main banner",
        data: newMiddleBanner,
      });
    }
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};
const middleBannerLists = async (req, res) => {
  try {
    const middleBannerList = await middleBannerModel.find({});

    if (!middleBannerList) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "middle banner image not found",
      });
    }

    res.status(200).json({
      code: 200,
      success: true,
      message: "Middle Banner list List fetched",
      data: middleBannerList,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
};
const middleBannerDelete = async (req, res) => {
  try {
    const { imageId } = req.params;

    if (!imageId) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: "Image ID is required",
      });
    }

    const exitingMiddleBanner = await middleBannerModel.findOne();

    if (!exitingMiddleBanner) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "No banner found",
      });
    }

    const updatedImages = exitingMiddleBanner.middleBanner.filter(
      (image) => image.id == imageId
    );

    if (updatedImages.length === exitingMiddleBanner.middleBanner.length) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: "Image not found",
      });
    }
    exitingMiddleBanner.middleBanner = updatedImages;
    await exitingMiddleBanner.save();

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
    });
  }
};

module.exports = {
  addMiddleBanner,
  middleBannerLists,
  middleBannerDelete,
};
