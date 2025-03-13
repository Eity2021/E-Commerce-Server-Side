const productModel = require("../../models/productModel");
const wishListModel = require("../../models/wishListModel");



const addToWishList = async (req,res) => {

   
try{

const {productId} = req.body;

const checkUser = req.user;
if(!checkUser){
    return res.status(200).json({
        code : 200,
        success:true,
        message:"Guest wishlist : store cart n localStorage"
    })
}


const userId = req.user.id;


if (!productId) {
    return res.status(400).json({ 
      code:400,
      success: false,
      message: "Invalid product ID" });
  }


  const product = await productModel.findById(productId);
  if (!product) {
    return res.status(404).json({   
        code:404,
        success: false,
        message: "Product not found" });
  }

let wishListItem = await wishListModel.findOne({userId, productId});

if (!wishListItem) {
    // If no wishlist exists, create a new one
    wishListItem = new wishListModel({ userId, products: [{ productId }] });
  } else {
    // Check if the product is already in the wishlist
    const productExists = wishListModel.products.some(
      (item) => item.productId.toString() === productId
    );

    if (productExists) {
      return res.status(400).json({ success: false, message: "Product already in wishlist" });
    }
    wishListItem.products.push({ productId });
  }
  await wishListItem.save();

  res.status(200).json({ 
    code:200,
    success: true, 
    message:  "Product added to wishlist", 
    wishListItem 

});
}catch(error) {
    res.status(500).json({
        code: 500,
        success: false,
        message: "Internal Server Error",
      });
}

}




const wishLists = async (req,res) => {
   
try{
    const userCheck = req?.user;

 if(!userCheck){

    const guestWishList = JSON.parse(localStorage.getItem("guestWishList")) || [];
    return res.status(200).json({
        code : 200,
        success:false,
        wishListItems:guestWishList
    })
 }


const userId = req?.user?.id;


const listItems = await wishListModel.find({userId}).populate({path:"productId", model:"product"}).sort({createdAt:-1})

res.status(200).json({
    code:200,
    success:true,
    message:"wishLit Fetched",
    listItems
});

}catch(error) {
    res.status(500).json({
        code: 500,
        success: false,
        message: "Internal Server Error",
      });
}

}


module.exports  = {addToWishList ,wishLists}