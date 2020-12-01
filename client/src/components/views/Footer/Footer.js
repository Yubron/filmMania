import React from 'react'
import { blueGrey } from '@material-ui/core/colors' 

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem',
            backgroundColor: blueGrey[900]
        }}>
           <p> Happy Coding Footer </p>
        </div>
    )
}

export default Footer
