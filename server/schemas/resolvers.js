const { User, JournalEntry, Goal } = require('../models');
const bcrypt = require('bcrypt');
const { signToken, verifyToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },
    user: async (_, { username }) => {
      try {
        return await User.findOne({ username }).populate('journalEntries').populate('goals');
      } catch (error) {
        throw new Error(error.message);
      }
    },
    journalEntries: async (_, { username }) => {
      try {
        const user = await User.findOne({ username });
        if (!user) throw new Error('User not found');
        return await JournalEntry.find({ journalAuthor: username });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    journalEntry: async (_, { journalId }) => {
      try {
        return await JournalEntry.findById(journalId);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    goals: async (_, { username }) => {
      try {
        const user = await User.findOne({ username });
        if (!user) throw new Error('User not found');
        return await Goal.find({ goalAuthor: username });
      } catch (error) {
        throw new Error(error.message);
      }
    },
    goal: async (_, { goalId }) => {
      try {
        return await Goal.findById(goalId);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return user;
    },
  },
  Mutation: {
    addUser: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = signToken(newUser);
        return { token, user: newUser };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid email or password');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error('Invalid email or password');

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addJournalEntry: async (_, { journalText }, { user }) => {
      try {
        if (!user) throw new Error('Not authenticated');
        const newJournalEntry = new JournalEntry({
          journalText,
          journalAuthor: user.username,
          createdAt: new Date().toISOString()
        });
        await newJournalEntry.save();
        return newJournalEntry;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateJournalEntry: async (_, { journalId, journalText }, { user }) => {
      try {
        if (!user) throw new Error('Not authenticated');
        const journalEntry = await JournalEntry.findById(journalId);
        if (!journalEntry) throw new Error('Journal entry not found');
        if (journalEntry.journalAuthor !== user.username) throw new Error('Unauthorized');

        journalEntry.journalText = journalText;
        await journalEntry.save();
        return journalEntry;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addGoal: async (_, { goalText }, { user }) => {
      try {
        if (!user) throw new Error('Not authenticated');
        const newGoal = new Goal({
          goalText,
          goalAuthor: user.username,
          createdAt: new Date().toISOString()
        });
        await newGoal.save();
        return newGoal;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    removeJournalEntry: async (_, { journalId }, { user }) => {
      try {
        if (!user) throw new Error('Not authenticated');
        const journalEntry = await JournalEntry.findById(journalId);
        if (!journalEntry) throw new Error('Journal entry not found');
        if (journalEntry.journalAuthor !== user.username) throw new Error('Unauthorized');

        await JournalEntry.findByIdAndDelete(journalId);
        return journalEntry;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    removeGoal: async (_, { goalId }, { user }) => {
      try {
        if (!user) throw new Error('Not authenticated');
        const goal = await Goal.findById(goalId);
        if (!goal) throw new Error('Goal not found');
        if (goal.goalAuthor !== user.username) throw new Error('Unauthorized');

        await Goal.findByIdAndDelete(goalId);
        return goal;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
