
const setToken = (token) => {
    return  localStorage.setItem('auth-x-token', token);
 }
 
 const getToken = () => {
    return  localStorage.getItem('auth-x-token');
 }
 
 export {
     setToken,
     getToken
 }