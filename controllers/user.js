const { User, Thought } = require('../models');

const userMasterController = {
    getUser( req, res ) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => { console.log(err); res.sendStatus(400) });
    },
    getUserId({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User no exist' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err); res.sendStatus(400);
        });
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId} },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User no exist' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
    delFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User no exist' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'YO' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    delUser({ params }, res) {
        Thought.deleteMany({ userId: params.id })
        .then(() => {
            User.findOneAndDelete({ userId: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'WAT' });
                    return;
                }
                res.json(dbUserData);
            });
        })
        .catch(err => res.json(err));
    }
};

module.exports = userMasterController