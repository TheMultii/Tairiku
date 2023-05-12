import { Route, Routes } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Home } from './routes';

const App: Component = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default App;
