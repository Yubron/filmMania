import React, {useEffect, useState} from 'react'
import { blueGrey } from '@material-ui/core/colors'
import Axios from 'axios';

function DetailBoard(props) {
    const postId = props.match.params.postId;
    const postType = props.match.params.postType;
    const [post, setPost] = useState("");
    const [postContents, setPostContents] = useState([]);
    
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

    if(post.writer){
    return (
        <div style={{ backgroundColor: blueGrey[800], minHeight: 'calc(100vh - 80px)', width: '100%',  borderRadius: '10px' }} >
            <br />
            <div style={{ width: '95%', margin: 'auto' }}>
                <div style = {{border: 'solid',
                               padding: '10px',
                               borderWidth: 'thin',
                               borderColor: blueGrey[500]
                }}>
                    {postType === 'free' &&
                        <div id='postType'>
                            <h2>자유게시판</h2> 
                            <hr style={{borderColor: blueGrey[500], borderWidth:'thin'}}/> 
                            <h3 style={{overflow:'auto'}}>자유 | {post.title}</h3>
                            <hr style={{borderColor: blueGrey[500], borderWidth:'thin'}}/> 
                        </div>
                    }
                    
                    {postType === 'qna' &&
                        <div id='postType'>
                            <h2>질문게시판</h2> 
                            <hr style={{borderColor: blueGrey[500], borderWidth:'thin'}}/> 
                            <h3 style={{overflow:'auto'}}>질문 | {post.title}</h3>
                            <hr style={{borderColor: blueGrey[500], borderWidth:'thin'}}/> 
                        </div>
                    }
                    <div id='postWriter'>
                        <p> <b>{post.writer.nickname}</b> 님 </p>
                    </div>
                    <div id='postCreDt'>
                        <p> {post.createdDt} </p> 
                    </div>
                    <hr style={{borderColor: blueGrey[500], borderWidth:'thin'}}/> 
                    <div id='postContent'>
                        {post.content.split('\n').map((postContent, index) => (
                            <p> {postContent} </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
    } else {
        return (
            <div style={{ backgroundColor: blueGrey[800], width: '100%', minHeight: 'calc(100vh - 80px)', borderRadius: '10px' }} >
            
            </div>
        )
    }

}

export default DetailBoard
