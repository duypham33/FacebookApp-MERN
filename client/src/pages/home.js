import { useSelector } from 'react-redux';
import React from 'react';
import Status from '../Components/Home/Status';
import Posts from '../Components/Home/Posts';
import RightSideBar from '../Components/Home/RightSideBar';

//let scroll = 0;

const Home = () => {
    const { homePosts, result, page } = useSelector(state => state.post);

    // window.addEventListener('scroll', () => {
    //     if(window.location.pathname === '/'){
    //         scroll = window.pageYOffset
    //         return scroll;
    //     }
    // })

    // useEffect(() => {
    //     setTimeout(() => {
    //         window.scrollTo({top: scroll, behavior: 'smooth'})
    //     }, 100)
    // },[])

    return (
        <div className="home row mx-0">
            <div className="col-md-8">
                <Status />

                {
                    page > 0 && ((result === 0 && homePosts.length === 0)
                    ? <h2 className="text-center">No Post</h2>
                    : <Posts />)
                }
                
            </div>
            
            <div className="col-md-4">
                <RightSideBar />
            </div>
        </div>
    )
}

export default Home;