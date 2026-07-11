import Landing from "./app/Landing.jsx";
import Signin from './app/auth/Signin/Signin.jsx'
import Singup from './app/auth/Signup/signup.jsx';
import Layout from './app/main/layout.jsx'
import { Routes,Route } from 'react-router-dom';
import {House,Folder} from 'lucide-react';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/layout" element={<Layout  Options={[{icon:House, content: "Dashboard"},{icon:Folder,content:'My Workspace'}]} Page={<h1>Dashboard</h1>} />} />
        
      </Routes>
    );
  };
