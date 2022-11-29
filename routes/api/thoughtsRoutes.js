const router = require('express').Router();

const {
    getThought,
    createThought,
    getSingleThought,
    deleteThought,
    putThought,
    deleteReaction,
    postReaction
} = require('../../controllers/ThoughtController')

router.route('/').get(getThought).post(createThought)
router.route('/:ThoughtId').get(getSingleThought).delete(deleteThought).put(putThought)
router.route('/:thoughtId/reactions').post(postReaction).delete(deleteReaction)


module.exports = router