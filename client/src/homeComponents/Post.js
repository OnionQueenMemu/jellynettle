import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom'
import Comments from './Comments';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';


const Post = ({post}) => {

    const arrow = useRef()

    const handleDropDown = (e) => {
        if(dropBool){
            setDropBool(false)
            arrow.current.classList.remove('commentsIconOpen')
            arrow.current.classList.add('commentsIcon')
        } else {
            setDropBool(true)
            arrow.current.classList.remove('commentsIcon')
            arrow.current.classList.add('commentsIconOpen')
        }
    }

    const [dropBool, setDropBool] = useState(false);


    const comments = post.Comments.map((comment) => <Comments key={comment.message} data={comment} /> )

    return (
        <div className='postContainer' key={post.message}>
            <NavLink to={`/profile/${post.userId}`}  className='userNameLink'>
                <div className='userName'>{post.User.userName}</div>
            </NavLink>
            <div className='userPost'>{post.message}</div>
            <div className='postDate'>{post.createdAt.slice(0, 10)}</div>
            <div className='upvotes'></div>
            <div className='postNav'>
            <div className='commentsButton' onClick={handleDropDown}>Comments
                <ArrowDropDownRoundedIcon ref={arrow} onClick={handleDropDown} className='commentsIcon'/>
            </div>
            <div className='likeButton'>Like</div>
            </div>
            {dropBool ? comments : null}
            {!comments.length && dropBool ? <div className='empty-thread'>Wow! Such empty, be the first to comment.</div> : null}
            <div className='makeCommentHidden'></div>
        </div>
    )
}

export default Post;