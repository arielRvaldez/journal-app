const { Query } = require('mongoose');
const { Goal, User, JournalEntry} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('goals') .populate('journalEntries');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('journalEntries').populate('goals');
    },
    journalEntries: async (parent, { username }) => {
      const params = username ? { username } : {};
      return JournalEntry.find(params).sort({ createdAt: -1 });
    },
    journalEntry: async (parent, { journalId }) => {
      return JournalEntry.findOne({ _id: journalId });
    },
    goals: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Goal.find(params).sort({ createdAt: -1 });
        },
    goal: async (parent, { goalId }) => {
        return Goal.findOne({ _id: goalId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('journalEntries').populate('goals');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addJournalEntry: async (parent, { journalText }, context) => {
      if (context.user) {
        const journalEntry = await journalEntry.create({
          journalText,
          journalAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { journalEntries: journal._id } }
        );

        return journalEntry;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    updateJournalEntry: async (parent, { journalId, journalText }, context) => {
      return await JournalEntry.findOneAndUpdate(
        { _id: journalId },
        { journalText },
        { new: true }
      );
    },
    addGoal: async (parent, { goalText }, context) => {
        if (context.user) {
          const goal = await Goal.create({
            goalText,
            goalAuthor: context.user.username,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { goals: goal._id } }
          );
  
          return goal;
        }
        throw AuthenticationError;
        ('You need to be logged in!');
      },
    },
    removeJournalEntry: async (parent, { journalId }, context) => {
      if (context.user) {
        const journalEntry = await journalEntry.findOneAndDelete({
          _id: journalId,
          journalAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { journalEntries: journalEntry._id } }
        );

        return thought;
      }
      throw AuthenticationError;
    },
    removeGoal: async (parent, { goalId }, context) => {
        if (context.user) {
          const goal = await Goal.findOneAndDelete({
            _id: goalId,
            goalAuthor: context.user.username,
          });
          
        await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { goals: goal._id } }
        );
  
        return goal;
        }
        throw AuthenticationError;
    },
    };


module.exports = resolvers;
