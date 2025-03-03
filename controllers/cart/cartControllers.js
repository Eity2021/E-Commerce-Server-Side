const cartModel = require("../../models/cartModel");



const addToCart = async (req,res) => {
    try{

        const userId = req.userId;
        const {productId} = res.body;

    if(!productId) {
        res.status(402).json({
            code:500,
            success:false,
            message:"Product Id not Found"
        })

    }

    const checkCartItems =  await cartModel.findOne({
        userId : userId,
        productId : productId
    })

    if(checkCartItems){
        res.status(400).json({
            code:400,
            success:false,
            message:"Items Already in a cart"
        })
    }
const cartItem = {
quantity :1,
userId:userId,
productId:productId
}


const items = await cartModel(cartItem)
await items.save();

res.status(201).json({
    code: 201,
    success: true,
    message: "Successfully! Added Cart Item",
    data: cartItem,
  });


    }catch(error){
        res.status(500).json({
            code: 500,
            success: false,
            message: error.message,
          });
    }
}


module.exports  = {addToCart }