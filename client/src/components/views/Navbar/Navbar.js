import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { blueGrey } from '@material-ui/core/colors'
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: '90%',
        margin: '20px auto',
        backgroundColor: blueGrey[600],
        color: 'white'

    },
});


function NavBar() {
    const classes = useStyles();
    const preventDefault = event => event.preventDefault();

    return (
        <div style={{ backgroundColor: blueGrey[800], width: '15%', height: '100%', margin: '0 1rem' }}>
            <Paper className={classes.root}>
                <MenuList>
                    <MenuItem disabled style={{ color: 'white' }} >
                        <Typography style={{ color: 'white' }} variant="inherit">게시판</Typography>
                    </MenuItem>
                    <hr style={{ borderStyle: 'dashed', color: blueGrey[700] }} />
                    <Link to='/board/photo'>
                        <MenuItem>
                            <Typography variant="inherit"> 사진게시판</Typography>
                        </MenuItem>
                    </Link>
                    <hr style={{ borderStyle: 'dashed', color: blueGrey[700] }} />
                    <Link to='/board/free'>
                        <MenuItem>
                            <Typography variant="inherit">자유게시판</Typography>
                        </MenuItem>
                    </Link>
                    <hr style={{ borderStyle: 'dashed', color: blueGrey[700] }} />
                    <Link to='/board/qna'>
                        <MenuItem>
                            <Typography variant="inherit">질문게시판</Typography>
                        </MenuItem>
                    </Link>
                </MenuList>
            </Paper>
        <br />
        <Paper className={classes.root}>
            <MenuList>
                <MenuItem disabled style={{ color: 'white' }} >
                    <Typography style={{ color: 'white' }} variant="inherit">중고장터</Typography>
                </MenuItem>
                <hr style={{ borderStyle: 'dashed', color: blueGrey[700] }} />
                <MenuItem>
                    <Typography variant="inherit"><Link to='/board/buy'> 삽니다 </Link></Typography>
                </MenuItem>
                <hr style={{ borderStyle: 'dashed', color: blueGrey[700] }} />
                <MenuItem>
                    <Typography variant="inherit"><Link to='/board/sell'>팝니다 </Link></Typography>
                </MenuItem>
            </MenuList>
        </Paper>
        </div >
    )
}

export default NavBar
