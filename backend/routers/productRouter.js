const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const middleware = require("../middleware/authMiddleware");

// const Product=require("./models/productModel")
// const asyncHandler=require("./middleware/asyncHandler")

// product routes

router
  .route("/")
  .get(productController.getProduct)
  .post(middleware.protect, middleware.admin, productController.createProduct);

router.route('/top').get(productController.getTopProducts)
router
  .route("/:id")
  .get(productController.getProductId)
  .put(middleware.protect, middleware.admin, productController.updateProduct)
  .delete(
    middleware.protect,
    middleware.admin,
    productController.deleteProduct
  );


  router.route('/:id/reviews').post(middleware.protect, productController.createProductReview)
//user routes

module.exports = router;
