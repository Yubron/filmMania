import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { TextField, Button } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors'
import { useSnackbar } from 'notistack';
import ImageUploader from "react-images-upload";



function PhotoWrite(props) {
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
        const formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        
        for(let i = 0 ; i < photos[photos.length-1].length ; i++) {
            formData.append('file', photos[photos.length-1][i]);
        }

            // Insert into DB
        const boardInfo = {
            writer: user.userData._id,
            title : values.title,
            content : values.content,
            type : postType,    
        };


        //TODO : callback 지옥 / Transaction 처리 필요 / API명 변경 
        Axios.post('/api/post/photo', boardInfo)
            .then(response => {
                if(response.data.success) {
                    const photoInfo = {
                        postId: response.data.post.postId,
                        writer: user.userData._id,
                    }
                    Axios.post('/api/post/photoFile', formData, config, )
                        .then(response => {
                            if(response.data.success) {
                                photoInfo.filename = response.data.filename;
                                Axios.post('/api/photo/photo', photoInfo)
                                    .then(response => {
                                        if(response.data.success) {
                                            enqueueSnackbar('This is a success message!', {variant: 'success'});
                                            setTimeout(() => {}, 1000);
                                            props.history.push(`/board/${postType}`);
                                        } else {
                                            alert('게시글 저장을 실패했어요');
                                        }
                                    })
                            } else {
                                alert('게시글 저장을 실패했어요');
                            }
                        })
                } else {
                    alert('게시글 저장을 실패했어요');
                }
            });
        
        // Save photo into Local Storage
        
    };

    const [photos, setPhotos] = useState([]);

    const onDrop = photo => {
        setPhotos([...photos, photo]);
    };


    return (
        
            <div style={{ backgroundColor: blueGrey[800], width: '100%', height: '100%' }}>
                <br />
                <div style={{width:'95%', margin:'20px auto 0px', textAlign:'center'}}> 
                    <h2 style={{textAlign:'left'}}>사진게시판</h2>                
                    <form onSubmit={writePost}>
                        <ImageUploader
                            {...props}
                            withIcon={true}
                            onChange={onDrop}
                            withPreview={true}
                            name='File'
                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                            maxFileSize={5242880}
                        />

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
                    </form>
                </div>
            </div>
        
    )
}

export default PhotoWrite
