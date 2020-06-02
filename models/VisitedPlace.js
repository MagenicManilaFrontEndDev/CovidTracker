const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitedPlaceSchema = new Schema({
    place: {
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
    isCrowded: {
        type: Boolean,
        default: false,
    },
});

module.exports = VisitedPlace = mongoose.model(
    'visitedplace',
    VisitedPlaceSchema
);
