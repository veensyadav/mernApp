import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Nav from './components/nav';
import Login from './components/login';
import TableData from './components/table';
import Analytics from './components/analytics';
import { useSelector } from 'react-redux';
import { authState } from './redux/modules/auth';
import { RootState } from './redux/store';

function App() {
  const auth: authState = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState(null);
  useEffect(() => {
      setData(sessionStorage.getItem('authToken'));
  }, [auth.user])
  console.log(data,"data");
  return (
    <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          {data && (
          <>
            <Route path="/main" element={<TableData />} />
            <Route path="/analytics" element={<Analytics />} />
          </>
        )}
        </Routes>
    </div>
  );
}

export default App;
