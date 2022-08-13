import {useContext} from 'react';
import { AuthContext } from '../context/auth_context/AuthState';
import { NoteContext } from '../context/note_context/NoteState';

export function useAuth() {
    return useContext(AuthContext);
}

export function useNote(){
    return useContext(NoteContext);
}