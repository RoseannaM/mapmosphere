const setLocation = () => {
  const getLocation = () =>
    new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(pos => {
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;
          const token = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
          fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?types=place,region,country&access_token=${token}`
          )
            .then(res => res.json())
            .then(myJson => {
              const [city, state, country] = myJson.features;
              resolve({
                lat: latitude,
                lng: longitude,
                city: city,
                state: state,
                country: country
              });
            });
        });
      } else {
        reject('Sorry, browser does not support geolocation!');
      }
    });

  return getLocation()
    .then(pos => {
      console.log(pos);
      return fetch('http://0.0.0.0:5000/spirit/api/v1.0/set/location', {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(pos),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    })
    .then(res => {
      return res.json().then(json => {
        if (res.ok) {
          return json;
        }
      });
    })
    .catch(error => {
      alert(error);
    });
};

export default setLocation;
