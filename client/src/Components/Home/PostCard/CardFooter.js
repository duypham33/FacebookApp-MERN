import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Send from '../../../static/images/send.svg';
//import LikeButton from '../../LikeButton'
import { useSelector, useDispatch } from 'react-redux';
//import { likePost, unLikePost, savePost, unSavePost } from '../../../redux/actions/postAction'
//import ShareModal from '../../ShareModal'
//import { BASE_URL } from '../../../utils/config'


const CardFooter = ({post}) => {
    
    const { auth } = useSelector(state => state);
    //const dispatch = useDispatch();


    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    

                    <Link to={`#`} className="text-dark">
                        <i className="far fa-comment" />
                    </Link>

                    <img src={Send} alt="Send" />
                </div>
               
            </div>

            <div className="d-flex justify-content-between">
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {post.likes.length}  {post.likes.length > 1 ? 'likes' : 'like'}
                </h6>
                
                <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
                    {post.comments.length}  {post.comments.length > 1 ? 'comments' : 'comment'}
                </h6>
            </div>

            
        </div>
    )
}

export default CardFooter;