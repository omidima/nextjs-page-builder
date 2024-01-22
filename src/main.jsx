import React from 'react'
import ReactDOM from 'react-dom/client'
import AppBuilder from './builder'
import "bootstrap/dist/css/bootstrap.rtl.min.css"
import "@radix-ui/themes/styles.css"
import "./fonts.css"
import "./main.css"
import { Theme } from "@radix-ui/themes"


export const API_URL = "http://localhost:3001/v1"
export const ACCESS_TOKEN = "access_token"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Theme>
      <AppBuilder />
    </Theme>
  </React.StrictMode>,
)
