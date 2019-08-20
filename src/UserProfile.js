window.loggedOut = false;
const UserProfile = (() => {
    return fetch('http://0.0.0.0:5000/spirit/api/v1.0/me', {credentials: 'include'})
    
    .then(res => res.json())
    .then(response => {
        window.loggedOut = response.loggedOut;
        return response.loggedOut;
    })
  });
  
  export default UserProfile;