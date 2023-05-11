import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './router/index'
import 'antd/dist/reset.css'

function App() {
  return (
    <RouterProvider router={routerConfig}></RouterProvider>
  );
}

export default App;
