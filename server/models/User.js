const { Schema, model } = require('mongoose');  
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    goals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Goal'
        }
    ],
    journalEntries: [
        {
            type: Schema.Types.ObjectId,
            ref: 'JournalEntry'
        }
    ]
});

const User = model('User', userSchema);

module.exports = User;