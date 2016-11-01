var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create article schema
var ArticleSchema = new Schema ({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	note: {
		type: Schema.Types.ObjectId,
		ref: 'Note'
	}
});

// article model with schema
var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;