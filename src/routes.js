import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import Character from './components/Info';

export default function MyRoutes() {
    return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/character/:id" element={<Character />} />
        </Routes>
    </BrowserRouter>
    )
};

