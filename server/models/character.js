const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    firstName: String,
    lastName: String,
    firstAppearance: String,
    lastAppearance: String,
    literature: [{ type: Schema.Types.ObjectId, ref: "Literature" }],
    children: [{ type: Schema.Types.ObjectId, ref: "Character" }],
    parents: [{ type: Schema.Types.ObjectId, ref: "Character" }]
});

module.exports = mongoose.model("Character", CharacterSchema);