import React from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { TextField, Button } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors'
import { useSnackbar } from 'notistack';


function BoardWrite(props) {
    const { enqueueSnackbar } = useSnackbar();

    const [values, setValues] = React.useState({
        title: '',
        content: '',
    });
    const postType = props.match.params.postType;
    
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const user = useSelector(state => state.user);
    const writePost = () => {   
        
        const boardInfo = {
            writer: user.userData._id,
            title : values.title,
            content : values.content,
            type : postType,
        };

        Axios.post(`/api/post/${postType}`, boardInfo)
        .then(response => {
            if(response.data.success) {
                enqueueSnackbar('This is a success message!', {variant: 'success'});
                setTimeout(() => {
                    
                }, 1000);
                props.history.push(`/board/${postType}`);
            } else {
                alert('failed to upload video');
            }
        })
        
    };
    return (
        
            <div style={{ backgroundColor: blueGrey[800], width: '100%', height: '100%' }}>
                <br />
                <div style={{width:'90%', margin:'20px auto 0px', textAlign:'center'}}> 
                    <TextField
                        fullWidth
                        id="outlined-adornment-title"
                        label="Title"
                        variant="outlined"
                        name="title"
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
                        name="content"
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
        
    )
}

export default BoardWrite
