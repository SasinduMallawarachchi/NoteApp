import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useNote } from '../middleware/contextHooks'
import { toast } from 'react-toastify';
import { truncateString } from '../middleware/utils';
import {
    Grid,
    Button, Container, Tooltip,
    Box, List, ListItem, ListItemText,
} from '@mui/material'

import Masonry from '@mui/lab/Masonry'
import MainContainer from '../components/MainContainer'
import NoteCard from '../components/NoteCard'


export default function NoteList() {
    const {getNotes, toasts, clearErrors, Notes, clearCurrentNote} = useNote();
    const navigate = useNavigate();
    const [myNotes, setMyNotes] = useState([]);

    useEffect(() => {
        if(!Notes){
            getNotes()
        }

        if(Notes){
            setMyNotes(Notes)
        }

        if(toasts){
            toasts.forEach(ele => {
                toast(ele.message, {type: ele.type})
            });
            clearErrors()
        }

    },[toasts, clearErrors, Notes, getNotes])

    const onCreateNewNote = () => {
        clearCurrentNote();
        navigate('/NewNote')
    }
    return (
        <MainContainer>
            <Container maxWidth="lg" sx={{py: 1, my: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={false} md={3}>
                        <List sx={{borderRadius: 5, mt: 3}}>
                            {myNotes?.map(Note => (
                                <Link
                                    style={{textDecoration: 'none'}}
                                    to={`/Notes/${Note._id}`} key={Note._id}>
                                    <ListItem>
                                        <Tooltip title={Note.title} placement='right'>
                                            <ListItemText 
                                                primary={truncateString(Note.title, 30)} 
                                            />
                                        </Tooltip>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </Grid>

                    {/* <Grid item xs={12} md={9}>
                        
                    </Grid> */}

                    <Grid item xs={12} md={9}>
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', mb: 2}}>
                            <Button onClick={onCreateNewNote}>Create New Note</Button>
                        </Box>
                        <Masonry columns={2}>
                            {myNotes?.map(Note => (
                                <NoteCard Note={Note} key={Note._id} />
                            ))}
                        </Masonry>
                    </Grid>
                </Grid>
            </Container>
        </MainContainer>
    )
}
