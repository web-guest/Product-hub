const express=require("express")
const router= express.Router();
const userController= require("../controllers/userController")
const authMiddleware= require("../middleware/authMiddleware")

//user routes
router.route('/').post(userController.registerUser).get(authMiddleware.protect, authMiddleware.admin, userController.getUsers)
// router.route('/:id').get(userController.getUserById)
router.post('/logout', userController.logoutUser)
router.post('/login', userController.authUser)
router.route('/profile').get(authMiddleware.protect, userController.getUserProfile).put(authMiddleware.protect, userController.updateUserProfile)
router.route('/:id').delete(authMiddleware.protect, authMiddleware.admin, userController.deleteUser).get(authMiddleware.protect, authMiddleware.admin, userController.getUserById).put(authMiddleware.protect, authMiddleware.admin, userController.updateUser)

module.exports=router