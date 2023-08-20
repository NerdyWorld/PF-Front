import React, { useEffect } from 'react';
import { GITHUB_CLIENT_ID } from '../../utils/utilities';
import { useDispatch } from 'react-redux';
import { githubAuth } from '../../features/user/userSlice';


const Login = () => {

  const dispatch = useDispatch();

  const githubLogin = () =>{
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=read:user,user:email`);
  };


  useEffect(() => {
    const location = window.location.search;
    const extractCode = new URLSearchParams(location);
    const code = extractCode.get("code");
    if(code){
      dispatch(githubAuth(code));  
    }
  }, []);

  return ( 
    <div>
      <button onClick={githubLogin}>Login with GitHub</button>
    </div>
   );
}
 
export default Login;