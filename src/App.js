import logo from './logo.svg';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar>

    </Navbar>
      <Routes>
      <Route path="/" element={<>
        <div>
          Home page

        </div>
      </>

      } />
      <Route path="/auth" element={<Login/>} />
      <Route path="*" element={<div>Error</div>} />

     </Routes>
    </>
  );
}

export default App;
