import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../store/posts';


const MakePost = () => {
    const { id } = useSelector(state => state.authentication);
    const [ message, setMessage ] = useState('');
    const { userName } = useSelector(state => state.authentication)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        dispatch(createPost(id, message))
        setMessage('')
    }



    const updateMessage = e => setMessage(e.target.value);

    return (
        <div className='makePostContainer'>
            <TextField id="standard-basic"
            value={message}
            onChange={updateMessage}
            label={!userName ? "What's up?" : `What's up, ${userName}?`} />
            <div className='postButton' onClick={handleSubmit}>Post</div>
        </div>
    )
}

export default MakePost;