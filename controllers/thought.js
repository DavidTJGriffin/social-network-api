const { User, Thought } = require('../models');

const thoughtController = {
	getThoughts(req, res) {
		Thought.find({})
			.select('-__v')
			.then(dbThoughtData => res.json(dbThoughtData))
	},

	getThought({ params }, res) {
		Thought.findOne({ _id: params.id })
			.select('-__v')
			.then(dbThoughtData => {
				res.json(dbThoughtData);
			})
	},
		
	createThought({ body }, res) {
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: body.userId },
					{ $push: { thoughts: _id } }
				);
			})
			.then(dbUserData => {
				res.json({message: 'Thought created successfully'});
			})
	},

	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body)
			.then(dbThoughtData => {
				res.json(dbThoughtData);
			})
	},	

	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
			.then(dbThoughtData => {
				res.json({message: 'Thought deleted successfully'});
			})
			
	},
	
	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.id },
			{ $push: { reactions: body } }
		)
			.then(dbThoughtData => {
				res.json(dbThoughtData);
			})
	},

	
};

module.exports = thoughtController;