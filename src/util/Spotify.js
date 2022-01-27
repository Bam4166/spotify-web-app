import { SearchBar } from "../Components/SearchBar/SearchBar";
import { SearchResults } from "../Components/SearchResults/SearchResults";

const clientID = 'c52dad31439244fbbfca7c8f0d3b878f';
const redirectURI = 'http://localhost:3000';
let accessToken;


const Spotify = {
    getAccessToken(){

        if(accessToken) return accessToken;
        /* check for access token match using window.location.href to return the url and the regexps provided by Spotify for Implicit Grant Flow (https://developer.spotify.com/documentation/general/guides/authorization/implicit-grant/) */

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            /* if we have both matches we set the access token value, a variable for the expiration time, an expiration value for our access token and we clear the parameters so the app doesn't try to grab the access token after it has expired */

            accessToken = accessTokenMatch[1];
            const expiry = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiry * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;

        } else {
            /* if we don't have a match on access token and expiry time, we redirect users to accessURL */
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },

    async search(query) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, { headers : {
            Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) return [];
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