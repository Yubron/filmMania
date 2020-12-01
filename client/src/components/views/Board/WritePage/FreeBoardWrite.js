import React from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { TextField, Button } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors'
import { SnackbarProvider, useSnackbar } from 'notistack';


function FreeBoardWrite(props) {

    const [values, setValues] = React.useState({
        title: '',
        content: '',
    });
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };
    const user = useSelector(state => state.user);
    const writePost = () => {
        const freeBoardInfo = {
            writer: user.userData._id,
            title : values.title,
            content : values.content,
        };

        Axios.post('/api/free/write', freeBoardInfo)
        .then(response => {
            if(response.data.success) {
                enqueueSnackbar('This is a success message!', 'success');
                setTimeout(() => {
                    
                }, 1000);
                props.history.push('/');
            } else {
                alert('failed to upload video');
            }
        })

    };
    return (
        <SnackbarProvider maxSnack={3}>
            <div style={{ backgroundColor: blueGrey[800], width: '100%', height: '100%' }}>
                <br />
                <div style={{width:'90%', margin:'20px auto 0px', textAlign:'center'}}> 
                    <TextField
                        fullWidth
                        id="outlined-adornment-title"
                        label="Title"
                        variant="outlined"
                        startAdornment={<p>*</p>}
                        onChange = {handleChange}
                        color="secondary"
                        InputLabelProps={{
                            shrink: true,
                            color: "primary"
                        }}
                        InputProps={{
                            style: {
                                color: "white"
                            }
                        }}
                        
                    />
                    <br/><br/><br/>
                    <TextField
                        fullWidth
                        multiline
                        rows="25"
                        id="outlined-adornment-title"
                        label="Content"
                        variant="outlined"
                        startAdornment={<p>*</p>}
                        onChange = {handleChange}
                        color="secondary"
                        InputLabelProps={{
                            shrink: true,
                            color: "primary"
                        }}
                        InputProps={{
                            style: {
                                color: "white",
                            }
                        }}
                    />
                    <br/><br/><br/>
                    <Button style={{width:'250px'}} variant="contained" color="primary" onClick={writePost}> 등록 </Button>
                </div>
            </div>
        </SnackbarProvider>
    )
}

export default FreeBoardWrite
