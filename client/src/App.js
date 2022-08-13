import './App.css';
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom'
import {ToastContainer, Zoom, Slide, Bounce, Flip} from 'react-toastify';

// #region --------------[ Import Components ]--------------
import NoteDetail from './pages/NoteDetail';
import NoteList from './pages/NoteList';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewNote from './pages/NewNote';
//import EditNote from './pages/EditNote';
import PrivateRoute from './pages/PrivateRoute';
// #endregion

function transitionAnimation () {
    const list = [Zoom, Slide, Bounce, Flip];
    return list[Math.floor(Math.random() * list.length)];
}

function transitionPosition () {
    const list = ['top-right', 'top-center', 'top-left']
    return list[Math.floor(Math.random() * list.length)];
}

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/profile" element={<PrivateRoute />} >
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route path="/Notes" element={<PrivateRoute />} >
                        <Route path="/Notes" element={<NoteList />} />
                    </Route>

                    <Route path="/Notes/:id" element={<PrivateRoute />} >
                        <Route path="/Notes/:id" element={<NoteDetail />} />
                    </Route>

                    <Route path="/NewNote" element={<PrivateRoute />} >
                        <Route path="/NewNote" element={<NewNote />} />
                    </Route>
                </Routes>
            </Router>

            <ToastContainer
                position={transitionPosition()} autoClose={2000}
                hideProgressBar={false} newestOnTop closeOnClick
                rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover
                transition={transitionAnimation()}
            />
        </div>
    );
}

export default App;
