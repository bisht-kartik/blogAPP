import './App.css';
import Post from './components/Post'
import Header from './components/Header';
import Login from './components/login'
import {Route,Routes} from "react-router-dom";
import Layout from './components/Layout';
import Register from './components/Register';
import IndexPage from './components/IndexPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path="/login"element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Route>
    </Routes>
  );
}

export default App;
