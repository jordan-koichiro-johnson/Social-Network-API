const { Reaction, Thought, User } = require('../models')

module.exports = {
    getThought(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .then((err) => res.status(500).json(err))
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : Thought.deleteMany({ _id: { $in: thought.thoughts } })
            )
            .then(() => res.json({ message: 'thought and associated apps deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    putThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId })
            .then((res) => res.status(404).json({ message: 'No thought with that ID' }))
            .then(() => res.json({ message: 'thought and associated apps changed!' }))
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Reaction.findOneAndDelete({ _id: req.params.thoughtId })
            .then((res) => res.status(404).json({ message: 'No reaction with that ID' }))
            .then(() => res.json({ message: 'reaction deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    postReaction(req, res) {
        Reaction.create(req.body)
            .then((thought) => res.json(thought))
            .then((err) => res.status(500).json(err))
    }
}