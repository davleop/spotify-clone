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
    console.log(this.spotifyApi);

    this.authUri = this.spotifyApi.createAuthorizeURL(scopes);
    console.log(this.authUri);
  }
}
