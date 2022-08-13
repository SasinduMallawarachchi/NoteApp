import {useState, useEffect} from 'react'
import MainContainer from '../components/MainContainer';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Paper, Button, TextField,
  Stack, IconButton, Typography
} from '@mui/material';
import {toast} from 'react-toastify';


// #region -----------( ICONS )-------------
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit'
// #endregion -----------( ICONS )-------------


import { useNote } from '../middleware/contextHooks';

export default function NoteDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
      Notes, currentNote, getNoteById, toasts, 
      clearToasts, deleteNote, updateNote, getNotes
    } = useNote();
    const [edit, setEdit] = useState(false);
    const [Note, setNote] = useState(null);
    const [temp, setTemp] = useState(null);

    useEffect(() => {
        if(!Notes) {
            getNotes();
        } else if(!currentNote || currentNote?._id !== id) {
            getNoteById(id);
        }

        if(currentNote?._id === id) {
            setNote(currentNote);
        }
        
        if(toasts){
            toasts.forEach(ele => {
                toast(ele.message, {type: ele.type})
            });
        }
    } , [currentNote, id, toasts, clearToasts, getNoteById, Notes, getNotes]);

    

    const handleEdit = () => {
        setEdit(true);
        setTemp(Note);
    }

    const handleCancel = () => {
        setEdit(false);
        setNote(temp);
    }

    const handleUpdate = () => {
        updateNote(Note);
        setEdit(false);
        //setTemp(null)
    }

    const handleDelete = () => {
        deleteNote(Note._id);
        navigate('/Notes');
        
    }


    const displayDisabled = () => {
        return (
            <Stack spacing={2}>
                <Stack spacing={2} direction='row'>
                    <TextField label='Title' value={Note?.content} disabled sx={{flexGrow: 1}}/>
                    <IconButton onClick={handleEdit}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteForeverIcon />
                    </IconButton>
                </Stack>
                <TextField label='Content' value={Note?.content} disabled multiline/>
            </Stack>
        )
    }
    
    return (
        <MainContainer>
            <Container maxWidth='md' sx={{mt: 3, mb: 5}}>
                <Paper >
                    {!edit 
                        ?   displayDisabled()
                        :   <Stack spacing={2}>
                                <TextField
                                    label='Title' name='title' value={Note?.title} 
                                    onChange={(e) => setNote({...Note, title: e.target.value})}
                                />
                                <TextField
                                    label='Content' name='content' value={Note?.content} 
                                    onChange={(e) => setNote({...Note, content: e.target.value})}
                                    multiline minRows={5} maxRows={20}
                                />

                                <Stack spacing={2} direction='row'>
                                    <Button variant='contained' onClick={handleUpdate}>Update</Button>
                                    <Button variant='outlined' sx={{color: 'primary.main'}} onClick={handleCancel}>Cancel</Button>
                                </Stack>
                            </Stack>
                    }
                </Paper>
            </Container>
        </MainContainer>
    )
}

