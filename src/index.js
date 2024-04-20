import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Home, PokeInfo } from "./App";
import About from './About';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:pokemonName",
    element: <PokeInfo />,
  },
  {
    path: "/About",
    element: <About />,
  },
]);
root.render(
  //<BrowserRouter>
    <RouterProvider router={router} />
  //</BrowserRouter>
);


reportWebVitals();