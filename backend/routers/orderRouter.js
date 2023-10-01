const express=require("express")
const router= express.Router();
const orderController= require("../controllers/orderController")
const middleware= require("../middleware/authMiddleware")

router.route('/').post(middleware.protect, orderController.addOrderItems).get(middleware.protect, middleware.admin, orderController.getOrders)
router.route('/mine').get(middleware.protect, orderController.getMyOrders)
router.route('/:id').get(middleware.protect, orderController.getOrderById)
router.route('/:id/pay').put(middleware.protect, orderController.updateOrderToPaid)
router.route('/:id/deliver').put(middleware.protect, middleware.admin, orderController.updateOrderToDelivered)

module.exports=router