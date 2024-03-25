const {Router} = require('express');
const userController = require('../controllers/user_controller');

const router = Router();

router.get('/',userController.getUsers);
router.post('/',userController.addUser);
router.get('/:id',userController.getUser);
router.patch('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);
router.delete('/',userController.deleteUsers);

module.exports = router;