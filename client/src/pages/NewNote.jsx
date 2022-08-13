import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useNote} from '../middleware/contextHooks';
import { Transition } from 'react-transition-group';
import {LoremIpsum} from 'lorem-ipsum';
import {toast} from 'react-toastify';
import gsap from 'gsap';
import {
    Grid, Slider, TextField, Container,
    Button, Paper, Stack, Typography, 
    FormControlLabel, Checkbox
} from '@mui/material';

// #region -----------( COMPONENTS )-------------
import MainContainer from '../components/MainContainer';
// #endregion -----------( COMPONENTS )-------------


export default function NewNote() {
    const navigate = useNavigate()

    const [NewNote, setNewNote] = useState({title: '', content: ''});
    const {
        toasts, clearErrors, createNote, 
        Notes, getNotes, 
        NoteCreated, currentNote
    } = useNote();
    const [onGenerate, setOnGenerate] = useState(false);

    useEffect(() => {
        if(!Notes) {
            getNotes();
        }

        if(toasts){
            toasts.forEach(ele => {
                toast(ele.message, {type: ele.type})
            })
            clearErrors()
        }
        
        if(NoteCreated){
            const id = currentNote._id
            navigate(`/Notes/${id}`)
        }
    }, [
        toasts, clearErrors, Notes, getNotes, navigate, 
        NoteCreated, currentNote
    ]);


    const handleSave = () => {
        if(NewNote.title.length > 0 && NewNote.content.length > 0) {
            createNote(NewNote);
        } else {
            toast('Please provide a Note title and content', {type: 'error'})
        }
    }

    const [loremOptions, setLoremOptions] = useState({
        minWordPerSentence: 3,
        maxWordPerSentence: 16,
        wordPerSentence: 4,

        minSentencePerParagraph: 4,
        maxSentencePerParagraph: 20,
        sentencePerParagraph: 5,

        minParagraphPerNote: 2,
        maxParagraphPerNote: 10,
        paragraphPerNote: 3,
    })

    const handleGenerate = () => {
        const lorem = new LoremIpsum({
            sentencesPerParagraph:{
                max: loremOptions.maxSentencePerParagraph,
                min: loremOptions.minSentencePerParagraph
            },
            wordsPerSentence: {
                max: loremOptions.maxWordPerSentence,
                min: loremOptions.minWordPerSentence
            }
        })

        setNewNote({
            title: lorem.generateSentences(1),
            content: lorem.generateParagraphs(loremOptions.paragraphPerNote)
        })
    }
    return (
        <MainContainer>
            <Container maxWidth="md" sx={{py: 2, my: 1, backgroundColor: 'silver'}} component={Paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <FormControlLabel align='left' 
                            control={
                                <Checkbox 
                                    checked={onGenerate}
                                    onChange={() => setOnGenerate(!onGenerate)}
                                />
                            } label='Auto Generate' 
                        />
                    </Grid>
                    
                    <Transition 
                        timeout={1000} in={onGenerate} mountOnEnter unmountOnExit
                        onEntering={(node) => {
                            gsap.from(node, {
                                y: -50,
                                autoAlpha: onGenerate ? 0 : 1,
                                duration: 0.5
                            })
                        }}
                        addEndListener={(node, done) => {
                            gsap.to(node, {
                                y: onGenerate ? 0 : -50,
                                autoAlpha: onGenerate ? 1 : 0,
                                onComplete: done
                            })
                        }}
                    >
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={12} lg={4}>
                                <Typography>Words Per Sentence</Typography>
                                <Slider  
                                    marks={[
                                        {value: loremOptions.minWordPerSentence, label: loremOptions.minWordPerSentence},
                                        {value: loremOptions.maxWordPerSentence, label: loremOptions.maxWordPerSentence},
                                    ]}
                                    min={loremOptions.minWordPerSentence} 
                                    max={loremOptions.maxWordPerSentence} 
                                    value={loremOptions.wordPerSentence}
                                    onChange={(e, value) => setLoremOptions({...loremOptions, wordPerSentence: value})}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Typography>Sentences Per Paragraphs</Typography>
                                <Slider  
                                    marks={[
                                        {value: loremOptions.minSentencePerParagraph, label: loremOptions.minWordPerSentence},
                                        {value: loremOptions.maxSentencePerParagraph, 
                                          label: loremOptions.maxSentencePerParagraph
                                        },
                                    ]}
                                    min={loremOptions.minSentencePerParagraph} 
                                    max={loremOptions.maxSentencePerParagraph} 
                                    value={loremOptions.sentencePerParagraph}
                                    onChange={(e, value) => setLoremOptions({...loremOptions, sentencePerParagraph: value})}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <Typography>Paragraphs Per Note</Typography>
                                <Slider  
                                    marks={[
                                        {value: loremOptions.minParagraphPerNote, label: loremOptions.minParagraphPerNote},
                                        {value: loremOptions.maxParagraphPerNote, label: loremOptions.maxParagraphPerNote},
                                    ]}
                                    min={loremOptions.minParagraphPerNote} 
                                    max={loremOptions.maxParagraphPerNote} 
                                    value={loremOptions.paragraphPerNote}
                                    onChange={(e, value) => setLoremOptions({...loremOptions, paragraphPerNote: value})}
                                />
                            </Grid>

                            <Grid item>
                                <Button fullWidth={false} onClick={handleGenerate}>Generate Note</Button>
                            </Grid>
                        </Grid>
                    </Transition>







                    <Grid item xs={12}>
                        <TextField
                            label="Title" value={NewNote.title}
                            onChange={(e) => setNewNote({...NewNote, title: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline minRows={8} maxRows={20}
                            label="Content" value={NewNote.content}
                            onChange={(e) => setNewNote({...NewNote, content: e.target.value})}
                        />
                    </Grid>

                    <Grid item >
                        <Stack spacing={2} direction="row">
                            <Button onClick={handleSave}>Save</Button>
                            <Button variant='outlined' onClick={e => setNewNote({title: '', content: ''})}>Clear</Button>
                            <Button onClick={() => navigate('/Notes')}>Cancel</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </MainContainer>
    )
}
