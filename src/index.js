import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalProvider } from './context/globalContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalProvider>
        <PayPalScriptProvider options={{"client-id": "Ad7WNItmuBn4ealmFHbGctFRd3eOmiqHpTuhpNjw44ryXmACwZypE9gIo4fBPmtvaO0ff6iIUIoE00sM"}}>
          <GoogleOAuthProvider clientId='210798772682-fdg2e07n7b12fa7hbm0578ni793fca7e.apps.googleusercontent.com'>
              <App />
          </GoogleOAuthProvider>
        </PayPalScriptProvider>
    </GlobalProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
