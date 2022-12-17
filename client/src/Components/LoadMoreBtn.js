import React from 'react';

const LoadMoreBtn = ({next, max, load, handleLoadMore}) => {
    return (
        <>
            {
                next >= max ? '' : 

                !load && <button className="btn btn-dark mx-auto d-block"
                onClick={handleLoadMore}>
                    Load more
                </button>
            }
            
        </>
    )
}

export default LoadMoreBtn;