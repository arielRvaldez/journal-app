import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            goal {
                _id
                goalText
                goalAuthor
                goalDate
            }
            journalEntry {
                _id
                journalText
                journalAuthor
                journalDate
            }
        }
    }
`;

export const QUERY_GOAL = gql`
    query goal {
        goal {
            _id
            goalText
            goalAuthor
            goalDate
        }
    }
`;

export const QUERY_JOURNALENTRY = gql`
    query journalEntry {
        journalEntry {
            _id
            journalText
            journalAuthor
            journalDate
        }
    }
`;

export const QUERY_USER = gql`
    query user {
        user {
            _id
            username
            email
            goal {
                _id
                goalText
                goalAuthor
                goalDate
            }
            journalEntry {
                _id
                journalText
                journalAuthor
                journalDate
            }
        }
    }
`; 