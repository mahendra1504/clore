import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import AboutUs from './Components/Aboutus/AboutUs';
import Login from './Components/Login/Login';

import Register from './Components/Register/Register';
import Contact from './Components/Contact/Contact';
import CartPage from './Components/Cart/CartPage';
import AccountPage from './Components/Account/AccountPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/About" element={<AboutUs></AboutUs>} />
      <Route path ="/Login" element={<Login></Login>} />
      <Route path ="/Account" element={<AccountPage></AccountPage>} />
      <Route path ="/Cart" element={<CartPage></CartPage>} />
      <Route path="/Register" element={<Register></Register>}/>
      <Route path ="/Contact" element={<Contact></Contact>}/>
    </Routes>
  </BrowserRouter>
  // <React.StrictMode>
  //   {/* <App /> */}
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
