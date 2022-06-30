import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import TitleBar from './components/titlebar';
import About from './components/about';
import Login from './components/login';
import Updates from './components/updates';
import Additions from './components/additions';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
    <Router>
    <TitleBar />
      <Routes>           
          <Route exact path="/" element={<Home />}/>           
          <Route path="/additions" element={<Additions />}/>   
          <Route exact path="/login" element={<Login />}/>  
          <Route path="/about" element={<About />}/>
      </Routes> 
    </Router>
    </div>
    );
}

export default App;