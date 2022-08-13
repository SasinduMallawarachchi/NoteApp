import {useContext} from 'react';
import { AuthContext } from '../context/auth_context/AuthState';
import { BlogContext } from '../context/note_context/NoteState';

export function useAuth() {
    return useContext(AuthContext);
}

export function useBlog(){
    return useContext(BlogContext);
}