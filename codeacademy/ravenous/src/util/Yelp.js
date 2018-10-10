const clientId = "eMkHgg3tJTvi2kUY5lK60Q";
const secret = "tCKkWMQRXJBEV9z0uzIyxC0uSi2lk6lYckzE5KVRWqaBBh7gsl8FGEMg3Q87ViKF";
let accessToken;


let Yelp = {
  // getAccessToken(){
  //   if(accessToken){
  //     return new Promise(resolve => resolve(accessToken));
  // }


  // return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=
  //   ${clientId}&client_secret=${secret}`, this.method:'POST').then(response => {return response.json();}).then(jsonResponse =>
  //      {accessToken = jsonResponse.access_token;})
  //    },

getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {
      method: 'POST'
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },
  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{
        headers:{Authorization: `Bearer ${accessToken}`
    }
  })
      }).then(response => {return response.json();}).then(jsonResponse =>
                {if(jsonResponse.businesses){
                  return jsonResponse.businesses.map(business=>({
                    id:business.id,
                    name:business.name,
                    category:business.categories[0].title,
                    rating: business.rating,
                    review: business.review_count,
                    //image: business.image_url,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zip: business.location.zip_code,                
                    imageSrc: business.image_url
                  }));
                  }


    });
  }
};

export default Yelp;



/*
const clientId = "eMkHgg3tJTvi2kUY5lK60Q";
const secret = "tCKkWMQRXJBEV9z0uzIyxC0uSi2lk6lYckzE5KVRWqaBBh7gsl8FGEMg3Q87ViKF";
let accessToken;



let Yelp = {
  getAccessToken(){
    if(accessToken){
      return new Promise(resolve => resolve(accessToken));
  }


  return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=
    ${clientId}&client_secret=${secret}`, this.method:'POST').then(response => {return response.json();}).then(jsonResponse =>
       {accessToken = jsonResponse.access_token;})
     },

  search(term, location, sortBy) {
    return Yelp.getAccessToken().then(() => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {headers:{Authorization: `Bearer ${accessToken}`
    }
  })

  }).then(response => {return response.json();}).then(jsonResponse =>
                {if(jsonResponse.businesses){
                  return jsonResponse.businesses.map(business=>({
                    id:business.id,
                    name:business.name,
                    category:business.categories[0].title,
                    rating: business.rating,
                    review: business.review_count,
                    //image: business.image_url,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zip: business.location.zip_code

                  }));
                  }


    });

  },

};

export default Yelp;


*/
