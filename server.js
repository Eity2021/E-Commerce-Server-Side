const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRouter = require("./routes/auth/auth-routes")
const dotenv = require('dotenv')

dotenv.config()
mongoose
  .connect(
process.env.MONGO_URI
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;
app. use(
    cors({
        origin: '*',
        methods:['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        Credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter )

app.get('/' , (req,res) => {
  res.send("api working")
})

app.listen(PORT , ()=> console.log(`Server is now running on port ${PORT}`));

