const baseUrl = 'https://www.instagram.com/';
const topsearch = 'web/search/topsearch/?context=blended&query=/';
const images = 'explore/locations/';

const fetchPhotos = city => {
  const result = fetch(baseUrl + topsearch + city, {
    method: 'get'
  })
    .then(function(res) {
      return res.json(); // pass the data as promise to next then block
    })
    .then(function(json) {
      const cityId = json.places[0].place.location.pk;
      console.log(cityId)
      return fetch(baseUrl + images + cityId + '/?__a=1', {
        headers: {
            'cookie': 'sessionid=TBD'
        }
      });
    })
    .then(function(res) {
      console.log(res.json());
      return res.json();
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });

  result.then(function(r) {
    console.log(r);
  });
};

export default fetchPhotos;
