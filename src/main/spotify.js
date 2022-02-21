/* eslint global-require: off, no-console: off, promise/always-return: off */

const SpotifyWebApi = require('spotify-web-api-node');
const credentials = require('../../env-vars.json');

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-private',
  'user-read-email',
  'user-follow-modify',
  'user-follow-read',
  'user-library-modify',
  'user-library-read',
  'streaming',
  'app-remote-control',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-read-private',
  'playlist-modify-public',
];

class SpotApi {
  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: credentials.clientId,
      clientSecret: credentials.clientSecret,
      redirectUri: credentials.redirectUri,
    });

    this.authUri = this.spotifyApi.createAuthorizeURL(scopes);
    this.code = null;
    this.loggedIn = false;
  }

  setCode(event, code) {
    if (!this.loggedIn) {
      console.log(`AUTHCODE: ${code}`);
      this.spotifyApi
        .authorizationCodeGrant(code)
        .then(
          (data) => {
            console.log(`Expires in ${data.body.expires_in}`);
            console.log(`Access token ${data.body.access_token}`);
            console.log(`Refresh token ${data.body.refresh_token}`);

            this.spotifyApi.setAccessToken(data.body.access_token);
            this.spotifyApi.setRefreshToken(data.body.refresh_token);
          },
          (err) => {
            console.log('Something went wrong!', err);
          }
        )
        .catch(console.log);

      this.code = code;
      this.loggedIn = true;
    }
  }
}

export default SpotApi;
