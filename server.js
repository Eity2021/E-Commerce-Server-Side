const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Import routes
const authRouter = require("./routes/auth/auth-routes");
const productRouter = require("./routes/product/productRoute");
const categoriesRouter = require("./routes/categories/categoriesRoute");
const subCategoriesRouter = require("./routes/subCategories/subCategoriesRoute");
const adminRouter = require("./routes/auth/admin-auth-routes");
const cartRouter = require("./routes/cart/cartRoute");
const bannerRouter = require("./routes/banner/bannerRoute");
const wishListRouter = require("./routes/wishList/wishListRoute");
const checkoutRouter = require("./routes/checkOut/checkOutRoute");
const orderRouter = require("./routes/order/orderRoute");
const couponRouter = require("./routes/coupon/couponRoute");
const middleBannerRouter = require("./routes/banner/middleBannerRoute");

dotenv.config();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Error:", error));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ✅ Prefix all routes with `/api`
const router = express.Router();
router.use("/adminAuth", adminRouter);
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/categories", categoriesRouter);
router.use("/subCategories", subCategoriesRouter);
router.use("/productCart", cartRouter);
router.use("/banner", bannerRouter);
router.use("/middle", middleBannerRouter);
router.use("/wish", wishListRouter);
router.use("/checkedOut", checkoutRouter);
router.use("/order", orderRouter);
router.use("/coupon", couponRouter);

app.use("/api", router); // ✅ Ensure all routes are prefixed with `/api`

// Test API Route
app.get("/", (req, res) => {
  res.send("API is working!");
});

// ✅ Correct serverless export for Vercel
module.exports = serverless(app);
