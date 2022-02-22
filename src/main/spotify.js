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
  getAlbum(id: string) {
    this.spotifyApi.getAlbum(id);
  }

  getAlbums(ids: Array<string>) {
    this.spotifyApi.getAlbums(ids);
  }

  getArtist(id: string) {
    this.spotifyApi.getArtist(id);
  }

  getArtists(ids: Array<string>) {
    this.spotifyApi.getArtists(ids);
  }

  getArtistAlbums(id: string) {
    this.spotifyApi.getArtistAlbums(id);
  }

  searchTracks(query: string) {
    this.spotifyApi.searchTracks(query);
  }

  searchArtists(query: string) {
    this.spotifyApi.searchArtists(query);
  }

  searchPlaylists(query: string) {
    this.spotifyApi.searchPlaylists(query);
  }

  getAlbumTracks(id: string, lim: number, off: number) {
    this.spotifyApi.getAlbumTracks(id, { limit: lim, offset: off });
  }

  getArtistTopTracks(id: string, suf = 'GB') {
    this.spotifyApi.getArtistTopTracks(id, suf);
  }

  getArtistRelatedArtist(id: string) {
    this.spotifyApi.getArtistRelatedArtist(id);
  }

  getAudioFeaturesForTrack(id: string) {
    this.spotifyApi.getAudioFeaturesForTrack(id);
  }

  getAudioAnalysisForTrack(id: string) {
    this.spotifyApi.getAudioAnalysisForTrack(id);
  }

  getAudioFeaturesForTracks(ids: Array<string>) {
    this.spotifyApi.getAudioFeaturesForTracks(ids);
  }

  /**
   * User methods
   */
  getUser(username: string) {
    this.spotifyApi.getUser(username);
  }

  getMe() {
    this.spotifyApi.getMe();
  }

  /**
   * Playlist methods
   */
  getPlaylist(id: string) {
    this.spotifyApi.getPlaylist(id);
  }

  getUserPlaylists(username: string) {
    this.spotifyApi.getUserPlaylists(username);
  }

  createPlaylist(title: string, descriptor: string, pub: boolean) {
    this.spotifyApi.createPlaylist(title, {
      description: descriptor,
      public: pub,
    });
  }

  addTracksToPlaylist(id: string, tracks: Array<string>, pos: number) {
    this.spotifyApi.addTracksToPlaylist(id, tracks, { position: pos });
  }

  removeTracksFromPlaylistByPosition(
    id: string,
    positions: Array<number>,
    snapshotId: string
  ) {
    this.spotifyApi.removeTracksFromPlaylistByPosition(
      id,
      positions,
      snapshotId
    );
  }

  // TODO(david): figure out type of `any` here...
  removeTracksFromPlaylist(id: string, tracks: Array<any>, snapId: string) {
    this.spotifyApi.removeTracksFromPlaylist(id, tracks, snapId);
  }

  reorderTracksInPlaylist(
    id: string,
    start_pos: number,
    end_pos: number,
    range: number
  ) {
    this.spotifyApi.reorderTracksInPlaylist(id, start_pos, end_pos, {
      // eslint-disable-next-line prettier/prettier
      'range_length': range,
    });
  }

  changePlaylistDetails(id: string, newName: string, public: boolean) {
    this.spotifyApi.changePlaylistDetails(id, {
      name: newName,
      // eslint-disable-next-line prettier/prettier
      'public': public,
    });
  }

  uploadCustomPlaylistCoverImage(id: string, uri: string) {
    this.spotifyApi.uploadCustomPlaylistCoverImage(id, uri);
  }

  followPlaylist(id: string, public: boolean) {
    // eslint-disable-next-line prettier/prettier
    this.spotifyApi.followPlaylist(id, { 'public': public });
  }

  unfollowPlaylist(id: string) {
    this.spotifyApi.unfollowPlaylist(id);
  }

  areFollowingPlaylist(id: string, usernames: Array<string>) {
    this.spotifyApi.areFollowingPlaylist(id, usernames);
  }

  /**
   * Following Users and Artists
   */
  getFollowedArtists(lim = 1) {
    this.spotifyApi.getFollowedArtists({ limit: lim });
  }

  followUsers(usernames: Array<string>) {
    this.spotifyApi.followUsers(usernames);
  }

  followArtists(artists: Array<string>) {
    this.spotifyApi.followArtists(artists);
  }

  unfollowUsers(usernames: Array<string>) {
    this.spotifyApi.unfollowUsers(usernames);
  }

  unfollowArtists(artists: Array<string>) {
    this.spotifyApi.unfollowArtists(artists);
  }

  isFollowingUsers(usernames: Array<string>) {
    this.spotifyApi.isFollowingUsers(usernames);
  }

  isFollowingArtists(artists: Array<string>) {
    this.spotifyApi.isFollowingArtists(artists);
  }

  /**
   * Music lib methods
   */
  getMySavedTracks(lim: number, off: number) {
    this.spotifyApi.getMySavedTracks({ limit: lim, offset: off });
  }

  containsMySavedTracks(tracks: Array<string>) {
    this.spotifyApi.containsMySavedTracks(tracks);
  }

  removeFromMySavedTracks(tracks: Array<string>) {
    this.spotifyApi.removeFromMySavedTracks(tracks);
  }

  addToMySavedTracks(tracks: Array<string>) {
    this.spotifyApi.addToMySavedTracks(tracks);
  }

  getMySavedAlbums(lim: number, off: number) {
    this.spotifyApi.getMySavedAlbums({ limit: lim, offset: off });
  }

  containsMySavedAlbums(albums: Array<string>) {
    this.spotifyApi.containsMySavedAlbums(albums);
  }

  removeFromMySavedAlbums(albums: Array<string>) {
    this.spotifyApi.removeFromMySavedAlbums(albums);
  }

  addToMySavedAlbums(albums: Array<string>) {
    this.spotifyApi.addToMySavedAlbums(albums);
  }

  /**
   * Browse methods
   */
  getNewReleases(lim: number, off: number, cou: string) {
    this.spotifyApi.getNewReleases({ limit: lim, offset: off, country: cou });
  }

  // time format: YYYY-MM-DDTHH:MM:SS
  getFeaturedPlaylists(
    lim: number,
    off: number,
    cou: string,
    loc: string,
    time: string
  ) {
    this.spotifyApi.getFeaturedPlaylists({
      limit: lim,
      offset: off,
      country: cou,
      locale: loc,
      timestamp: time,
    });
  }

  getCategories(lim: number, off: number, cou: string, loc: string) {
    this.spotifyApi.getCategories({
      limit: lim,
      offset: off,
      country: cou,
      locale: loc,
    });
  }

  getCategory(cat: string, cou: string, loc: string) {
    this.spotifyApi.getCategory(cat, { coutnry: cou, locale: loc });
  }

  getPlaylistForCategory(cat: string, cou: string, lim: number, off: number) {
    this.spotifyApi.getPlaylistForCategory(cat, {
      country: cou,
      limit: lim,
      offset: off,
    });
  }

  getRecommendations(min: number, artists: Array<string>, pop: number) {
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

  getMyRecentlyPlayedTracks(lim: number) {
    this.spotifyApi.getMyRecentlyPlayedTracks({ limit: lim });
  }

  getMyCurrentPlayingTrack() {
    this.spotifyApi.getMyCurrentPlayingTrack();
  }

  pause() {
    this.spotifyApi.pause();
  }

  seek(positionMs: number) {
    this.spotifyApi.seek(positionMs);
  }

  setRepeat(mode: string) {
    this.spotifyApi.setRepeat(mode);
  }

  setVolume(vol: number) {
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

  setShuffle(toggle: boolean) {
    this.spotifyApi.setShuffle(toggle);
  }

  transferMyPlayback(deviceIds: Array<string>) {
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
