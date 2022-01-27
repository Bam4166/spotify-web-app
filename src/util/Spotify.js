const clientID = 'APIKEY';
const redirectURI = 'http://localhost:3000';
let accessToken;


const Spotify = {
    getAccessToken(){

        if(accessToken) return accessToken;
        /* check for access token match using window.location.href to return the url and the regexps provided by Spotify for Implicit Grant Flow (https://developer.spotify.com/documentation/general/guides/authorization/implicit-grant/) */

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            /* if there are matches on both URL locations, we set the access token value and an expiration value for our access token */

            accessToken = accessTokenMatch[1];
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
        // request to Spotify's API
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, { headers : {
            Authorization: `Bearer ${accessToken}`}
            // once the request is fulfilled, the response is converted to json
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            // Verify if there are no songs in the json response, which will return an empty array
            if (!jsonResponse.tracks) return [];
            // otherwise it returns a mapped jsonresponse object with the id, name, artist, album and uri of the request's query
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    }
}

export default Spotify;