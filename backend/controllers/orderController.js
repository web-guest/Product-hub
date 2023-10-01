const Order=require("../models/orderModel")
const asyncHandler=require("../middleware/asyncHandler")

exports.addOrderItems= asyncHandler(async(req, res)=>{
   const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
   } =req.body;

   if(orderItems && orderItems.length === 0){
    res.status(400)
    throw new Error('No order items')
   }else{
    const order= new Order({
        orderItems: orderItems.map((x)=>({
            ...x,
            product: x._id,
            _id:undefined
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    })
    const createOrder= await order.save();
    res.status(201).json(createOrder)
   }
})

exports.getMyOrders = asyncHandler(async(req, res)=>{
    const orders= await Order.find({user: req.user._id})
    res.status(200).json(orders)
})

exports.getOrderById = asyncHandler(async(req, res)=>{
    const order= await Order.findById(req.params.id).populate('user','name email')
    if(order){
        res.status(200).json(order)
    }else{
        res.status(404)
        throw new Error('order not found')
    }
    
})

exports.updateOrderToPaid = asyncHandler(async(req, res)=>{
    const order= await Order.findById(req.params.id)
    if(order){
        order.isPaid= true;
        order.paidAt= Date.now()
        order.paymentResult={
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder= await order.save();
        res.status(200).json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('order not found')
    }
})

exports.updateOrderToDelivered = asyncHandler(async(req, res)=>{
    const order= await Order.findById(req.params.id);
    if(order){
        order.isDelivered=true;
        order.deliveredAt=Date.now();

        const updatedOrder= await order.save();

        res.status(200).json(updatedOrder)
    }else{
        res.status(404);
        throw new Error('Order not found')
    }
})

exports.getOrders = asyncHandler(async(req, res)=>{
    const orders= await Order.find({}).populate('user', 'id name')
    res.status(200).json(orders)
})