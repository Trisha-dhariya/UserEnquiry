import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Enquiry from './Enquiry.jsx'

import 'sweetalert2/dist/sweetalert2.min.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Enquiry/>
  </StrictMode>,
)
