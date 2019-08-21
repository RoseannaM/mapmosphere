const UserProfile = (() => {
    return fetch('http://0.0.0.0:5000/spirit/api/v1.0/me', {credentials: 'include'})
    .then(res => res.json())
    .then(response => {
        return response
    })
  });
  
  export default UserProfile;