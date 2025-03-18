const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth-routes");
const dotenv = require("dotenv");
const productRouter = require("./routes/product/productRoute");
const categoriesRouter = require("./routes/categories/categoriesRoute");
const subCategoriesRouter = require("./routes/subCategories/subCategoriesRoute");
const adminRouter = require("./routes/auth/admin-auth-routes");
const cartRouter = require("./routes/cart/cartRoute");
const bannerRouter = require("./routes/banner/bannerRote");
const middleBannerRouter = require("./routes/banner/middleBannerRoute");
const wishListRouter = require("./routes/wishList/wishListRoute");
const checkoutRouter = require("./routes/checkOut/checkOutRoute");
const orderRouter = require("./routes/order/orderRoute");
const couponRouter = require("./routes/coupon/couponRoute");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

const app = express();
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    Credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/adminAuth", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/subCategories", subCategoriesRouter);
app.use("/api/productCart", cartRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/middle", middleBannerRouter);
app.use("/api/wish", wishListRouter);
app.use("/api/checkedOut", checkoutRouter);
app.use("/api/order", orderRouter);
app.use("/api/coupon", couponRouter);

app.get("/", (req, res) => {
  res.send("api working");
});

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
