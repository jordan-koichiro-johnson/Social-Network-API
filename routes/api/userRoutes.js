const router = require('express').Router();

const {
    getUser,
    createUser,
    getSingleUser,
    deleteUser,
    putUser
} = require('../../controllers/userController')

router.route('/').get(getUser).post(createUser)
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(putUser)

module.exports = router