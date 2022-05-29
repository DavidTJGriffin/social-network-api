const { User, Thought } = require('../models');

const userController = {
	
	getUsers(req, res) {
		User.find({})
			.select('-__v -thoughts')
			.then(dbUserData => res.json(dbUserData))
	},

	
	getUser({ params }, res) {
		User.findOne({ _id: params.id })
			.populate({
				path: 'thoughts',
				select: '-__v'
			})
			.select('-__v')
			.then(dbUserData => {
				res.json(dbUserData);
			})
	},
		
	createUser({ body }, res) {
		User.create(body)
			.then(dbUserData => res.json(dbUserData))
	},

	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body)
			.then(dbUserData => {
				res.json(dbUserData);
			})
	},	

	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then(dbUserData => {
				return Promise.all(dbUserData.thoughts.map(thought => Thought.findOneAndDelete({ _id: thought.toString() })));
			})
			.then(([dbUserData]) => {
				res.json({message: 'User deleted successfully'});
			})
			
	},
	
	addFriend({ params }, res) {
		Promise.all([
			User.findOneAndUpdate(
				{ _id: params.id },
				{ $push: { friends: params.friendId } }
			),
			User.findOneAndUpdate(
				{ _id: params.friendId },
				{ $push: { friends: params.id } }
			)
		])
		.then(([dbUserData, dbFriendData]) => {
			res.json({message: 'Added friend successfully'});
		})
		
	},
};

module.exports = userController;
