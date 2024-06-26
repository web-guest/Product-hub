const Product=require("../models/productModel")
const asyncHandler=require("../middleware/asyncHandler")

exports.getProduct= asyncHandler(async(req, res)=>{
  const pageSize=4
  const page= Number(req.query.pageNumber) || 1;
  const keyword= req.query.keyword ? {name: {$regex: req.query.keyword, $options: 'i'}}:{}
  const count = await Product.countDocuments({...keyword});
  
    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))

    res.json({products, page, pages: Math.ceil(count/pageSize)})
})
exports.getProductId=asyncHandler(async(req, res)=>{
    const product= await Product.findById(req.params.id)
    res.json(product)
 })

 exports.createProduct= asyncHandler(async (req, res)=>{
    const product= new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image:'/images/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'
        
    })
    const createdProduct= await product.save();
    res.status(200).json(createdProduct)
 })

 exports.updateProduct= asyncHandler(async(req, res)=>{
    const {name, price, description, image, brand, category, countInStock}= req.body
    const product= await Product.findById(req.params.id);

    if(product){
        product.name= name;
        product.price= price;
        product.description= description;
        product.image= image;
        product.brand= brand;
        product.category= category;
        product.countInStock= countInStock

        const updateProduct= await product.save();
        res.json(updateProduct)
    }else{
        res.status(404);
        throw new Error('Resource not found')
    }

})

exports.deleteProduct= asyncHandler(async(req, res)=>{
    const product= await Product.findById(req.params.id);
 console.log(product._id)
    if(product){
        await Product.deleteOne({_id: product._id})
        console.log('deleted')
        res.status(200).json({message:'Product deleted'})

    }else{
        res.status(404);
        throw new Error('Resource not found')
    }

})

exports.createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Product already reviewed');
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
  
      product.reviews.push(review);
  
      product.numReviews = product.reviews.length;
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
  
      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });
  exports.getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  
    res.status(200).json(products);
  });