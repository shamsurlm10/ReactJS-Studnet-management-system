import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Create from './pages/Create';
import Home from './pages/Home';
import Update from './pages/Update';
import CustomNavbar from './components/navbar';

function App() {


    return (
        <div className="App">
            <Router>
                <CustomNavbar />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/create" element={<Create />}></Route>
                        <Route path="/update/:id" element={<Update />}></Route>
                    </Routes>
                </Container>
            </Router>
        </div>
    );
}

export default App;

