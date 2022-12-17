import React, { useState, useEffect } from 'react';
import LoadMoreBtn from '../LoadMoreBtn';
import PostThumb from '../PostThumb';
import LoadIcon from '../../static/images/loading.gif';

const Posts = ({userData, posts}) => {
    const [results, setResults] = useState([]);
    const [next, setNext] = useState(3);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setNext(3);
        setResults(posts.slice(0, posts.length > next ? next : posts.length));
        
    },[posts]);

    const handleLoadMore = async () => {
        setLoad(true);
        const newNext = next + 3;
        setNext(newNext);
        setResults(posts.slice(0, posts.length > newNext ? newNext : posts.length));
        
        setLoad(false);
    }

    return (
        <div>
            <PostThumb results={results} />

            {
                load && <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
            }

            
            <LoadMoreBtn next={next} max={posts.length}
            load={load} handleLoadMore={handleLoadMore} />
            
        </div>
    )
}

export default Posts;