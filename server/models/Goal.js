const { Schema, model } = require('mongoose');

const goalSchema = new Schema({
    goalText: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Goal = model('Goal', goalSchema);

module.exports = Goal;
