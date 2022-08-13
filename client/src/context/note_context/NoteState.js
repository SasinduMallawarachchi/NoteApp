import {createContext, useReducer} from 'react';
import axios from 'axios';
import NoteReducer from './NoteReducer';
import * as ActionTypes from '../ContextActions';

export const NoteContext = createContext();

export default function NoteState(props){
    const initialstate = {
        Notes: null,
        currentNote: null,
        toasts: null,
        NoteCreated: false
    }

    const [state, dispatch] = useReducer(NoteReducer, initialstate);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token'),
        }
    }

    // #region --------------[ Actions ]--------------

    const getNotes = async () => {
        try {
            const res = await axios.get('/api/Notes', config);
            dispatch({
                type: ActionTypes.GET_NoteS_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.Note_FAIL,
                payload: err.response.data,
            })
        }
    }

    const getNoteById = async (NoteId) => {
        try {
            dispatch({
                type: ActionTypes.GET_Note_BY_ID,
                payload: NoteId
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.Note_FAIL,
                payload: err.response.data,
            })
        }
    }

    const createNote = async (NoteData) => {
        try {
            const res = await axios.post('/api/Notes', NoteData, config);
            dispatch({
                type: ActionTypes.NEW_Note_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.Note_FAIL,
                payload: err.response.data,
            })
        }
    }

    const updateNote = async (NoteData) => {
        try {
            const res = await axios.put(`/api/Notes/${NoteData._id}`, NoteData, config);
            dispatch({
                type: ActionTypes.UPDATE_Note,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.Note_FAIL,
                payload: err.response.data,
            })
        }
    }

    const deleteNote = async (NoteId) => {
        try {
            const res = await axios.delete(`/api/Notes/${NoteId}`, config);
            dispatch({
                type: ActionTypes.Note_DELETE,
                payload: res.data
            })
        } catch (err) {
            console.log(err.response.data);
            dispatch({
                type: ActionTypes.Note_FAIL,
                payload: err.response.data,
            })
        }
    }

    const clearErrors = async () => {
        dispatch({
            type: ActionTypes.CLEAR_ERRORS,
        })
    }

    const clearNotes = async () => {
        dispatch({
            type: ActionTypes.CLEAR_NoteS
        })
    }

    const clearCurrentNote = () =>{
        dispatch({type: ActionTypes.CLEAR_CURRENT_Note})
    }

    // #endregion

    return (
        <NoteContext.Provider value={{
            Notes: state.Notes,
            currentNote: state.currentNote,
            toasts: state.toasts,
            NoteCreated: state.NoteCreated,
            
            clearCurrentNote,
            getNotes,
            getNoteById,
            createNote,
            updateNote,
            deleteNote,
            clearErrors,
            clearNotes

        }}>
            {props.children}
        </NoteContext.Provider>
    )
}