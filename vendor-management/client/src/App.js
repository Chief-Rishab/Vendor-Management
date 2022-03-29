import './App.css';
import React from 'react';
import Form from './common/form';
import NavBar from './components/navbar';
import TextField from "@mui/material/TextField";

function App() {

  
  return (
      <main className='container'>
        <NavBar />
        <div style={{ marginTop: 80 }}>
          <Form />
        </div>
        
      </main>
  );
}

export default App;
