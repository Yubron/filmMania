import React from 'react'
import { blueGrey } from '@material-ui/core/colors' 

function Header() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            fontSize:'1rem',
            margin: '0 1rem',
            backgroundColor: blueGrey[900],
        }}>
           <p style={{ height: '100%' }}> <a href="/">HOME</a> </p>
           <p style={{ height: '100%',marginLeft: '2rem' }}> 전체게시물 </p>
           <p style={{ height: '100%',marginLeft: '2rem' }}> 인기게시물 </p>
        </div>
    )
}

export default Header
