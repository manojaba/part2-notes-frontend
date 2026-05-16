import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import './index.css'


const notes = [
  {id:'1',
    content:'HTML is easy',
    important:true
  },
  {
    id:'2',
    content:'browser can execute only javascript',
    important:false
  },
  {
    id:'3',
    content:'GET and Post are the most import methods of HTTP protocol',
    important:true
  }
]

  createRoot(document.getElementById('root')).render(<App ></App>)




