import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom';

import { blueGrey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

function RegisterPage(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '90%',
            },
        },
    }));
    const classes = useStyles();
    const dispatch = useDispatch();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");

    const onIdHandler = (event) => {
        setId(event.target.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }
    const onConfrimPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }
    const onNicknameHandler = (event) => {
        setNickname(event.target.value);
    }
    const onEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
        }

        let body = {
            id : id,
            password : password,
            nickname : nickname,
            email : email,
        }
        
        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    props.history.push("/");
                } else{
                    alert("Failed to sign up");
                }
            });
    }

    return (
        <div style={{ backgroundColor: blueGrey[800], width: '100%', height: '100%' }}>
            <form className={classes.root} 
                  noValidate 
                  autoComplete="off"
                  onSubmit={onSubmitHandler}
                  style={{width:'80%', textAlign:'center', paddingTop:'50px', margin: '0px auto' }}>
            <h1 style={{textAlign:'left'}}>회원가입</h1> <br /><br />
                <TextField
                    required
                    id="filled-required"
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
                    id="filled-required"
                    label="Password"
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
                <TextField
                    required
                    id="filled-required"
                    label="Password check"
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
                    onChange={onConfrimPasswordHandler}
                />

                <TextField
                    required
                    id="filled-required"
                    label="Nickname"
                    variant="filled"
                    InputProps={{
                        style: {
                            color: "white"
                        }
                    }}
                    InputLabelProps={{
                        style: { color: '#bbdefb' },
                    }}
                    onChange={onNicknameHandler}
                />

                <TextField
                    required
                    id="filled-required"
                    label="Email"
                    type="email"
                    variant="filled"
                    InputProps={{
                        style: {
                            color: "white"
                        }
                    }}
                    InputLabelProps={{
                        style: { color: '#bbdefb' },
                    }}
                    onChange={onEmailHandler}
                />

                <Button variant="contained" color="secondary" onClick={onSubmitHandler}> 회원가입 </Button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
