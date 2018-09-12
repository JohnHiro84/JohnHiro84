import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
  constructor(props){
    super(props)
    this.state = { term:''}

    //////this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleTerm = this.handleTerm.bind(this);
  }

//handleSearch(event){
//    this.props.Spotify(this.state.term);
//    event.preventDefault();
//  }

search(term){
    this.props.onSearch(this.state.term);
}


//Extract Terms desired target value from event object
handleTerm(event){
  let wantedValue = event.target.value;
  this.handleTermChange(wantedValue);
}

//sets the state of term to the desired target value
handleTermChange(value){
    this.setState({term: value});
}

  render(){
  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTerm}/>
      <a onClick={this.search}>SEARCH</a>
    </div>
         )

  }



}


export default SearchBar;
