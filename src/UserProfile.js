const UserProfile = (() => {
    return fetch('/spirit/api/v1.0/me', {credentials: 'include'})
    .then(res => res.json())
    .then(response => {
        return response
    })
  });
  
  export default UserProfile;