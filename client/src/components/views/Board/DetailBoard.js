import React, {useEffect, useState} from 'react'
import { blueGrey } from '@material-ui/core/colors'
import Axios from 'axios';

function DetailBoard(props) {
    const postId = props.match.params.postId;
    const postType = props.match.params.postType;
    const [post, setPost] = useState("");

    useEffect(() => {
        Axios.get(`/api/post/${postType}/${postId}`)
        .then(response => {
            if(response.data.success) {
                setPost(response.data.post);
            } else {
                alert("게시글을 불러오지 못했습니다.");
            }
        })
        
    }, [])

    return (
        <div style={{ backgroundColor: blueGrey[800], width: '100%', height: '100%' }} >
            <br />
            <div style={{ width: '95%', height: '85%', margin: 'auto' }}>
                <h2>자유게시판</h2>
                
                <h2> {post.content} </h2>
            </div>
        </div>
    )
}

export default DetailBoard
