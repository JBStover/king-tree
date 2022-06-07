const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LiteratureSchema = new Schema({
    title: String,
    releaseDate: String,   
    characters: [{ type: Schema.Types.ObjectId, ref: "Character" }]
});

module.exports = mongoose.model("Literature", LiteratureSchema);