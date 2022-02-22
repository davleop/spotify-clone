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

  /**
   * Spotify authentication methods
   */
  setCode(event, code) {
    if (!this.loggedIn && this.code === null) {
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

  refresh() {
    this.spotifyApi
      .refreshAccessToken()
      .then(
        (data) => {
          this.spotifyApi.setAccessToken(data.body.access_token);
          this.spotifyApi.setRefreshToken(data.body.refresh_token);
        },
        (err) => {
          console.log('Something went wrong!', err);
        }
      )
      .catch(console.log);
  }

  /**
   * Get methods
   */
  getAlbum(id) {
    this.spotifyApi.getAlbum(id);
  }

  getAlbums(ids) {
    this.spotifyApi.getAlbums(ids);
  }

  getArtist(id) {
    this.spotifyApi.getArtist(id);
  }

  getArtists(ids) {
    this.spotifyApi.getArtists(ids);
  }

  getArtistAlbums(id) {
    this.spotifyApi.getArtistAlbums(id);
  }

  searchTracks(query) {
    this.spotifyApi.searchTracks(query);
  }

  searchArtists(query) {
    this.spotifyApi.searchArtists(query);
  }

  searchPlaylists(query) {
    this.spotifyApi.searchPlaylists(query);
  }

  getAlbumTracks(id, lim, off) {
    this.spotifyApi.getAlbumTracks(id, { limit: lim, offset: off });
  }

  getArtistTopTracks(id, suf = 'GB') {
    this.spotifyApi.getArtistTopTracks(id, suf);
  }

  getArtistRelatedArtist(id) {
    this.spotifyApi.getArtistRelatedArtist(id);
  }

  getAudioFeaturesForTrack(id) {
    this.spotifyApi.getAudioFeaturesForTrack(id);
  }

  getAudioAnalysisForTrack(id) {
    this.spotifyApi.getAudioAnalysisForTrack(id);
  }

  getAudioFeaturesForTracks(ids) {
    this.spotifyApi.getAudioFeaturesForTracks(ids);
  }

  /**
   * User methods
   */
  getUser(username) {
    this.spotifyApi.getUser(username);
  }

  getMe() {
    this.spotifyApi.getMe();
  }

  /**
   * Playlist methods
   */
  getPlaylist(id) {
    this.spotifyApi.getPlaylist(id);
  }

  getUserPlaylists(username) {
    this.spotifyApi.getUserPlaylists(username);
  }

  createPlaylist(title, descriptor, pub) {
    this.spotifyApi.createPlaylist(title, {
      description: descriptor,
      public: pub,
    });
  }

  addTracksToPlaylist(id, tracks, pos) {
    this.spotifyApi.addTracksToPlaylist(id, tracks, { position: pos });
  }

  removeTracksFromPlaylistByPosition(id, positions, snapshotId) {
    this.spotifyApi.removeTracksFromPlaylistByPosition(
      id,
      positions,
      snapshotId
    );
  }

  removeTracksFromPlaylist(id, tracks, snapId) {
    this.spotifyApi.removeTracksFromPlaylist(id, tracks, snapId);
  }

  reorderTracksInPlaylist(id, start_pos, end_pos, range) {
    this.spotifyApi.reorderTracksInPlaylist(id, start_pos, end_pos, {
      // eslint-disable-next-line prettier/prettier
      'range_length': range,
    });
  }

  changePlaylistDetails(id, newName, public) {
    this.spotifyApi.changePlaylistDetails(id, {
      name: newName,
      // eslint-disable-next-line prettier/prettier
      'public': public,
    });
  }

  uploadCustomPlaylistCoverImage(id, uri) {
    this.spotifyApi.uploadCustomPlaylistCoverImage(id, uri);
  }

  followPlaylist(id, public) {
    // eslint-disable-next-line prettier/prettier
    this.spotifyApi.followPlaylist(id, { 'public': public });
  }

  unfollowPlaylist(id) {
    this.spotifyApi.unfollowPlaylist(id);
  }

  areFollowingPlaylist(id, usernames) {
    this.spotifyApi.areFollowingPlaylist(id, usernames);
  }

  /**
   * Following Users and Artists
   */
  getFollowedArtists(lim = 1) {
    this.spotifyApi.getFollowedArtists({ limit: lim });
  }

  followUsers(usernames) {
    this.spotifyApi.followUsers(usernames);
  }

  followArtists(artists) {
    this.spotifyApi.followArtists(artists);
  }

  unfollowUsers(usernames) {
    this.spotifyApi.unfollowUsers(usernames);
  }

  unfollowArtists(artists) {
    this.spotifyApi.unfollowArtists(artists);
  }

  isFollowingUsers(usernames) {
    this.spotifyApi.isFollowingUsers(usernames);
  }

  isFollowingArtists(artists) {
    this.spotifyApi.isFollowingArtists(artists);
  }

  /**
   * Music lib methods
   */
  getMySavedTracks(lim, off) {
    this.spotifyApi.getMySavedTracks({ limit: lim, offset: off });
  }

  containsMySavedTracks(tracks) {
    this.spotifyApi.containsMySavedTracks(tracks);
  }

  removeFromMySavedTracks(tracks) {
    this.spotifyApi.removeFromMySavedTracks(tracks);
  }

  addToMySavedTracks(tracks) {
    this.spotifyApi.addToMySavedTracks(tracks);
  }

  getMySavedAlbums(lim, off) {
    this.spotifyApi.getMySavedAlbums({ limit: lim, offset: off });
  }

  containsMySavedAlbums(albums) {
    this.spotifyApi.containsMySavedAlbums(albums);
  }

  removeFromMySavedAlbums(albums) {
    this.spotifyApi.removeFromMySavedAlbums(albums);
  }

  addToMySavedAlbums(albums) {
    this.spotifyApi.addToMySavedAlbums(albums);
  }

  /**
   * Browse methods
   */
  getNewReleases(lim, off, cou) {
    this.spotifyApi.getNewReleases({ limit: lim, offset: off, country: cou });
  }

  // time format: YYYY-MM-DDTHH:MM:SS
  getFeaturedPlaylists(lim, off, cou, loc, time) {
    this.spotifyApi.getFeaturedPlaylists({
      limit: lim,
      offset: off,
      country: cou,
      locale: loc,
      timestamp: time,
    });
  }

  getCategories(lim, off, cou, loc) {
    this.spotifyApi.getCategories({
      limit: lim,
      offset: off,
      country: cou,
      locale: loc,
    });
  }

  getCategory(cat, cou, loc) {
    this.spotifyApi.getCategory(cat, { coutnry: cou, locale: loc });
  }

  getPlaylistForCategory(cat, cou, lim, off) {
    this.spotifyApi.getPlaylistForCategory(cat, {
      country: cou,
      limit: lim,
      offset: off,
    });
  }

  getRecommendations(min, artists, pop) {
    this.spotifyApi.getRecommendations({
      min_energy: min,
      seed_artists: artists,
      min_popularity: pop,
    });
  }

  getAvailableGenreSeeds() {
    this.spotifyApi.getAvailableGenreSeeds();
  }

  /**
   * Player
   */
  getMyDevices() {
    this.spotifyApi.getMyDevices();
  }

  getMyCurrentPlaybackState() {
    this.spotifyApi.getMyCurrentPlaybackState();
  }

  getMyRecentlyPlayedTracks(lim) {
    this.spotifyApi.getMyRecentlyPlayedTracks({ limit: lim });
  }

  getMyCurrentPlayingTrack() {
    this.spotifyApi.getMyCurrentPlayingTrack();
  }

  pause() {
    this.spotifyApi.pause();
  }

  seek(positionMs) {
    this.spotifyApi.seek(positionMs);
  }

  setRepeat(mode) {
    this.spotifyApi.setRepeat(mode);
  }

  setVolume(vol) {
    this.spotifyApi.setVolume(vol);
  }

  skipToNext() {
    this.spotifyApi.skipToNext();
  }

  skipToPrevious() {
    this.spotifyApi.skipToPrevious();
  }

  play() {
    this.spotifyApi.play();
  }

  setShuffle(toggle) {
    this.spotifyApi.setShuffle(toggle);
  }

  transferMyPlayback(deviceIds) {
    this.spotifyApi.transferMyPlayback(deviceIds);
  }

  /**
   * Personalization Endpoints
   */
  getMyTopArtists() {
    this.spotifyApi.getMyTopArtists();
  }

  getMyTopTracks() {
    this.spotifyApi.getMyTopTracks();
  }
}

export default SpotApi;
