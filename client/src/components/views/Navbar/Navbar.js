import React from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { blueGrey } from '@material-ui/core/colors'

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

    return ( 
        <div style={{ backgroundColor: blueGrey[800], width: '15%', height: '100%', margin: '0 1rem' }}>
            <Paper className={classes.root}>
                <MenuList>
                    <MenuItem disabled style={{color: 'white'}} >
                        <Typography style={{color: 'white'}} variant="inherit">게시판</Typography>
                    </MenuItem>
                    <hr style={{borderStyle:'dashed', color:blueGrey[700]}}  />
                    <MenuItem>
                        <Typography variant="inherit"> <a href='/board/photo'>사진게시판</a></Typography>
                    </MenuItem>
                    <hr style={{borderStyle:'dashed', color:blueGrey[700]}}  />
                    <MenuItem>
                        <Typography variant="inherit"> <a href='/board/free'>자유게시판</a></Typography>
                    </MenuItem>
                    <hr style={{borderStyle:'dashed', color:blueGrey[700]}}  />
                    <MenuItem>
                        <Typography variant="inherit"><a href='/board/question'>질문게시판</a> </Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
            <br />
            <Paper className={classes.root}>
                <MenuList>
                    <MenuItem disabled style={{color: 'white'}} >
                        <Typography style={{color: 'white'}} variant="inherit">중고장터</Typography>
                    </MenuItem>
                    <hr style={{borderStyle:'dashed', color:blueGrey[700]}}  />
                    <MenuItem>
                        <Typography variant="inherit"><a href='/board/buy'> 삽니다 </a></Typography>
                    </MenuItem>
                    <hr style={{borderStyle:'dashed', color:blueGrey[700]}}  />
                    <MenuItem>
                        <Typography variant="inherit"><a href='/board/sell'>팝니다 </a></Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
        </div>
    )
}

export default NavBar
