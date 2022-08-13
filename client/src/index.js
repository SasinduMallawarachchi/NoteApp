import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'simplebar/dist/simplebar.min.css'
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@mui/material/styles'
import lightTheme from './themes/lightTheme';

//#region --------------[ States ]--------------
import AuthState from './context/auth_context/AuthState';
import NoteState from './context/note_context/NoteState';
// #endregion
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider theme={lightTheme}>
          <AuthState>
              <NoteState> 
                  <App />
              </NoteState>
          </AuthState>
      </ThemeProvider>
  </React.StrictMode>
);

