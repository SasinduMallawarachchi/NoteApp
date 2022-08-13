import * as ActionTypes from '../ContextActions'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case ActionTypes.NEW_Note_SUCCESS:
            let Notes = state.Notes ? state.Notes : [];

            return{
                ...state,
                NoteCreated: true,
                currentNote: action.payload,
                Notes: [...Notes, action.payload]
            }
        case ActionTypes.GET_NoteS_SUCCESS:
            return{
                ...state,
                Notes: action.payload
            }
        case ActionTypes.Note_FAIL:
            return{
                ...state,
                toasts: action.payload
            }
        case ActionTypes.UPDATE_Note:
            return {
                ...state,
                currentNote: action.payload,
                Notes: state.Notes.map(Note => Note._id === action.payload._id ? action.payload : Note)
            }
        case ActionTypes.Note_DELETE:
            return {
                ...state,
                Notes: state.Notes.filter(Note => Note._id !== action.payload.NoteId),
                toasts: action.payload.toasts
            }
        case ActionTypes.GET_Note_BY_ID:
            return {
                ...state,
                currentNote: state.Notes ? state.Notes.find(Note => Note._id === action.payload) : null
            }
        case ActionTypes.CLEAR_ERRORS:
            return {
                ...state,
                toasts: null
            }
        case ActionTypes.CLEAR_CURRENT_Note:
            return {
                ...state,
                currentNote: null,
                NoteCreated: false
            }
        case ActionTypes.CLEAR_NoteS:
            return {
                ...state,
                Notes: null,
                currentNote: null,
                NoteCreated: false,
                toasts: null
            }
        default:
            return state;
    }
}