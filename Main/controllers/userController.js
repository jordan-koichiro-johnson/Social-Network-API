const { Reaction, Thought, User } = require('../models')

module.exports = {
    getUser(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .then((err) => res.status(500).json(err))
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and associated apps deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    putUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId })
            .then((res) => res.status(404).json({ message: 'No user with that ID' }))
            .then(() => res.json({ message: 'User and associated apps changed!' }))
            .catch((err) => res.status(500).json(err));
    }
}