
const clientId = "5c5513141b284d129f3c7a824df18561";
//const secret = "3023d7f19937490fa574f48355407959";

//let redirectUri = 'https://john12345678.surge.sh/';
let accessToken;
let redirectUri = "http://localhost:3000/";
let userId;
let playlistId;

let Spotify = {

getAccessToken() {
  //if accessToken is allready there, set it to accessToken
    if (accessToken) {
      console.log("line 14 - access token is:" + accessToken);
      return accessToken;

    }
//check to see if the accessToken is allready set in the URL

	   let URLToCheck = window.location.href;
	   let checkForAccessToken = URLToCheck.match(/access_token=([^&]*)/);
	   let checkForExpire = URLToCheck.match(/expires_in=([^&]*)/);
     console.log("line 23 checkForAccessToken: " + checkForAccessToken);
     console.log("line 24 checkForExpire:  "+ checkForExpire)

	     if (checkForAccessToken && checkForExpire) {
      	accessToken = checkForAccessToken[1];
	      let expirationTime = Number(checkForExpire[1]);

		    window.setTimeout(() => accessToken = '', expirationTime * 1000);
	      window.history.pushState('Access Token', null, '/');
	   	  return accessToken;
     	  } else {

//accessToken is empty and is not in the URL
        let URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&&redirect_uri=${redirectUri}&scope=playlist-modify-public`;
        window.location.href = URL;
        }
},

  search(term) {
    let accessToken = Spotify.getAccessToken();

      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
        headers: { Authorization: `Bearer ${accessToken}`}
        }
        ).then(response =>
        {return response.json();}
        ).then(jsonResponse => {
                  if(jsonResponse.tracks){
                  return jsonResponse.tracks.items.map(track=>({

                      id:track.id,
                      name:track.name,
                      artist:track.artists[0].name,
                      album: track.album.name,
                      uri: track.uri

                  }
                ));
                } else {

                  return [];
                }


    });
  },

  savePlaylist(listname, trackUriList) {

    if(!listname || !trackUriList.length){
      return;
    }
    let accessToken = Spotify.getAccessToken();


////
let headers = {
      'Authorization': `Bearer ${accessToken}`
    }
    let userId = '';
return fetch(`https://api.spotify.com/v1/me`, {headers: headers})
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;

        console.log('line 87 userId:'+ userId);
        return fetch (`https://api.spotify.com/v1/users/${userId}/playlists/`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: listname})})
      .then(response => response.json())
      .then(jsonResponse => {
        let playlistId = jsonResponse.id;

        console.log('line 95 playlistId:'+ jsonResponse.id);
        return fetch (`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUriList})
        }).then(

          window.open("https://open.spotify.com/collection/playlists"),
        )
      })
    })}
};


    export default Spotify;
