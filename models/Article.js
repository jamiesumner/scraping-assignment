const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true,
        unique: false
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;