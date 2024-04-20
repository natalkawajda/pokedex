import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Home, PokeInfo } from "./App";

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
]);
root.render(
  //<BrowserRouter>
    <RouterProvider router={router} />
  //</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();