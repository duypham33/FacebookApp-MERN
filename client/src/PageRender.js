import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './Components/NotFound';
import { useSelector } from 'react-redux';

const generatePage = (pageName) => {
  const component = () => require(`./pages/${pageName}`).default;
  try{
    return React.createElement(component());
  } catch(err){
    return <NotFound/>;
  }
} 


const PageRender = () => {
  const auth = useSelector(state => state.auth);
  
  const {page, id} = useParams();
  let pageName = "";
  
  if(auth.user) {
    if(id)
      pageName = `${page}/[id]`;
    else
      pageName = `${page}`;
  }

  else if(page !== 'register')
    pageName = 'login';
  else
    pageName = 'register';
  
  return generatePage(pageName);
}

export default PageRender;