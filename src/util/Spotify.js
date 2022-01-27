let accessToken;

const Spotify = {
    getAccessToken(){
        if(accessToken) return accessToken;
        
        // check for access token match
        const accessToken = window.location.href;
    }
}

export default Spotify;