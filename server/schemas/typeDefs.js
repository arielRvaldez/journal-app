const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    journalEntries: [JournalEntry]!
    goals: [Goal]!
  }

  type JournalEntry {
    _id: ID
    journalText: String
    journalAuthor: String
    createdAt: String
  }

  type Goal {
    _id: ID
    goalText: String
    goalAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    journalEntries(username: String): [JournalEntry]
    journalEntry(journalId: ID!): JournalEntry
    updateJournalEntry(journalId: ID!, journalText: String!): JournalEntry
    goals(username: String): [Goal]
    goal(goalId: ID!): Goal
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addJournalEntry(thoughtText: String!): JournalEntry
    addGoal(goalText: String!): Goal
    updateGoal(goalId: ID!, goalText: String!): Goal
    removeJournalEntry(journalId: ID!): JournalEntry
    removeGoal(goalId: ID!): Goal
  }
`;

module.exports = typeDefs;
