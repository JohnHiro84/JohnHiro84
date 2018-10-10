import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchResults from './Components/SearchResults/SearchResults';
import Playlist from './Components/Playlist/Playlist';
import SearchBar from './Components/SearchBar/SearchBar';
import Spotify from './util/Spotify';


class App extends Component {
  constructor(props) {
    super(props);
    this.state ={ searchResults:[],
                  playlistName:"New Playlist",
                  playlistTracks:[]
                };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }


  addTrack(track) {
        const playlistIndex = this.state.playlistTracks.findIndex(t => t.id === track.id);
        if (playlistIndex === -1){
            this.state.playlistTracks.push(track);
            this.setState({playlistTracks: this.state.playlistTracks});
        }
  }


  removeTrack(track){
        const playlistIndex = this.state.playlistTracks.findIndex(t => t.id === track.id);
        if (playlistIndex !== -1){
            this.state.playlistTracks.splice(playlistIndex, 1);
            this.setState({playlistTracks: this.state.playlistTracks});
        }
  }

 playlistNameHandler(event){
  let name = event.target.value;
  this.updatePlaylistName(name);
}

  searchSpotify(term) {
  Spotify.search(term).then(track =>
    {this.setState({searchResults:track})});
  };

  savePlaylist(){
    let trackUris = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackUris).then(
          this.setState({
            //reset the playlist name and tracks
            playlistName: "new playlist",
            playlistTracks: [],
            searchResults: []
        })
      );
//    SearchBar.clearSearchBar();

}

  search(term) {
      Spotify.search(term).then(tracks => {
        this.setState({searchResults: tracks});
      });
    }

    updatePlaylistName(name) {
    this.setState({playlistName: name});
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>

            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack} playlistName={this.state.playlistName}/>

          </div>
        </div>
      </div>
    )
  }
}

export default App;
