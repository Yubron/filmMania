import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import { USER_SERVER } from '../../Config';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect, Route } from "react-router";
import { loginUser } from '../../../_actions/user_actions';
import { blueGrey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { useSelector } from "react-redux";

function RightNavbar(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '90%',
          },
        },
      }));
    const classes = useStyles();
    
    const user = useSelector(state => state.user)

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const onIdHandler = (event) => {
        setId(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const dispatch = useDispatch();

    const loginHandler = (event) => {
        event.preventDefault();
        let body = {
            id : id,
            password : password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    window.location.reload();
                } else {
                    alert('Error');
                }
            });
    }

    const logoutHandler = () => {
        Axios.get(`${USER_SERVER}/logout`).then(response => {
          if (response.status === 200) {
            window.location.reload();
          } else {
            alert('Log Out Failed')
          }
        });
      };
    
    if (user.userData && !user.userData.isAuth) {
    return (
        <div style={{backgroundColor:blueGrey[800] , width: '15%', height: '100%', margin: '0 1rem'}}>
            <div style={{border:'1px'}}>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={loginHandler}>
                    <TextField
                        required
                        id="filled"
                        label="ID"
                        variant="filled"
                        InputProps={{
                            style: {
                                color: "white"
                            }
                        }}
                        InputLabelProps={{
                            style: { color: '#bbdefb' },
                        }}
                        onChange={onIdHandler}
                    />
                    <TextField
                        required
                        id="filled"
                        label="PW"
                        type="password"
                        variant="filled"
                        InputProps={{
                            style: {
                                color: "white"
                            }
                        }}
                        InputLabelProps={{
                            style: { color: '#bbdefb' },
                        }}
                        onChange={onPasswordHandler}
                    />

                    <Button variant="contained" color="primary" onClick={loginHandler}> 로그인 </Button>
                    <Button variant="contained" color="secondary" href="/register" > 회원가입 </Button>
                </form>
                
            </div>
        </div>
    )}
    else {
        return (
            <div style={{backgroundColor:blueGrey[800] , width: '15%', height: '100%', margin: '0 1rem'}}>
            <div style={{border:'1px'}}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        disabled
                        id="filled"
                        label="Nickname"
                        variant="filled"
                        InputProps={{
                            style: {
                                color: "white"
                            },
                            value: 'test'
                        }}
                        InputLabelProps={{
                            style: { color: '#bbdefb' },
                        }}
                        
                    />
                    <Button variant="contained" color="primary" onClick={logoutHandler}> 로그아웃 </Button>
                </form>
            </div>
        </div>
        
        )
    }
}
export default withRouter(RightNavbar)


//export default RightNavbar
