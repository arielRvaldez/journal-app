import { gql } from "apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const QUERY_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;


export const QUERY_GOAL = gql`
    mutation createGoal($goalText: String!) {
        createGoal(goalText: $goalText) {
            _id
            goalText
            goalAuthor
            goalDate
        }
    }
`;

export const QUERY_JOURNALENTRY = gql`
    mutation createJournalEntry($journalText: String!) {
        createJournalEntry(journalText: $journalText) {
            _id
            journalText
            journalAuthor
            journalDate
        }
    }
`;