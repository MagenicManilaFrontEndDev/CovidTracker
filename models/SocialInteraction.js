const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialInteractionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    hours: {
        type: Number,
        required: true,
    },
    isSocialDistancing: {
        type: Boolean,
        default: true,
    },
});

module.exports = SocialInteraction = mongoose.model(
    'socialinteraction',
    SocialInteractionSchema
);
