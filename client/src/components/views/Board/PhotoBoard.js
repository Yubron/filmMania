import React from 'react'
import Axios from 'axios';
import { Link } from "react-router-dom";
import { blueGrey } from '@material-ui/core/colors'

import { TextField, Button } from '@material-ui/core';


function PhotoBoard() {

    return (
        <div style={{ backgroundColor: blueGrey[800], width: '100%', height: '100%', borderRadius: '10px' }} >
            <br />

            <div style={{ width: '95%', height: '85%', margin: 'auto' }}>
                <h2>사진게시판</h2>

            </div>
            <br /><br />
            <div style={{ width: '95%', margin: '0 auto', textAlign: 'end' }}>

                <Link to={{
                    pathname: '/board/photo/write',
                }}>
                    <Button variant="contained" color="primary"> 글쓰기 </Button>
                </Link>
            </div>
        </div>
    )
}

export default PhotoBoard
