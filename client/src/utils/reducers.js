import {
    ADD_ENTRY,
    ADD_GOAL,
    REMOVE_ENTRY,
    UPDATE_ENTRY
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_ENTRY:
            return {
                ...state,
                journalOpen: true,
                entries: [...state.journal, action.entry],
            };  
        
        case ADD_GOAL:
            return {
                ...state,
                goals: [action.goal, ...state.goals],
            };
        
        case REMOVE_ENTRY:
        let newState = state.entries.filter((entry => {
        return entry._id !== action._id;
        }));

        return {
                ...state,
                journalOpen: newState.length > 0,
                Journal: newState
                }

        case UPDATE_ENTRY:
            return {
                ...state,
                products: [...action.entries],
            };
            

            default:
                return state;
        }
        };  
