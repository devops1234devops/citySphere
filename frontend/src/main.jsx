import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <Auth0Provider
      domain="dev-2gnl5igvn3p7bia0.us.auth0.com"
      clientId="LzmyA1AJOSKF2gINWdaVc7TMbW4fiBrj"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >

        <App />
        </Auth0Provider>
    </React.StrictMode>,
)
