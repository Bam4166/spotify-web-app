const clientID = 'c52dad31439244fbbfca7c8f0d3b878f';
const redirectURI = 'http://localhost:3000';
let accessToken;


export const Spotify = {
    getAccessToken(){

        if(accessToken) return accessToken;
        /* check for access token match using window.location.href to return the url and the regexps provided by Spotify for Implicit Grant Flow (https://developer.spotify.com/documentation/general/guides/authorization/implicit-grant/) */

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            /* if there are matches on both URL locations, we set the access token value and an expiration value for our access token */

            accessToken = accessTokenMatch[1];
            accessToken = accessToken.replace('=', '');
            const expiry = Number(expiresInMatch[1]);
            

            // the following code prevents the app from trying to grab an access token after it has expired
            window.setTimeout(() => accessToken = '', expiry * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;

        } else {
            /* if there's no match, users are redirected to accessURL */
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },

    async search(query) {
        console.log(query)
        // request to Spotify's API
        const accessToken = Spotify.getAccessToken();
        console.log(accessToken);
        return await fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, { headers : { Authorization: `Bearer ${accessToken}`}
            // once the request is fulfilled, the response is converted to json
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            // Verify if there are no songs in the json response, which will return an empty array
            console.log(jsonResponse);
            if (!jsonResponse.tracks) {
                return [];
            }

            // otherwise it returns a mapped jsonResponse object with the id, name, artist, album and uri of the request's query
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artists: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    async savePlaylist(playlistName, trackURIs) {
        // If there are no track URIs or a playlist name, the save function will break
        if (!playlistName || !trackURIs.length) return;

        // otherwise three variables are created, one for the current user's accessToken, one for the authorization header containing the user's access token, and lastly an usersID variable initialized with an empty state
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userID;

        // fetch request to get the user's id
        return await fetch('https://api.spotify.com/v1/me', {headers: headers, method: 'GET'}).then(response => {
            // once the promise is fulfilled, the response is converted to json

            response.json();
        }).then(jsonResponse => {
            // and once this promise is fulfilled, userID is assigned with the id value we got from the jsonResponse

            userID = jsonResponse.id;

            // With the userID, we make a POST request to Spotify's API in order to 
            
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, 
                { headers: headers, 
                method: 'POST',
                body: JSON.stringify({ playlistName: playlistName})
                }
            )
            // once this promise is fulfilled, the response is converted  to json
        }).then(response => {
            return response.json();
            // and finally, the id parameter is returned from jsonResponse and stored in playlistID 
        }).then(jsonResponse => {
            const playlistID = jsonResponse.id;

            // a new fetch POST request is made, this time for the trackURIs
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                    {  headers: headers,
                       method: 'POST',
                       body: JSON.stringify({ URIs: trackURIs })
            })
        })    
    }
}
