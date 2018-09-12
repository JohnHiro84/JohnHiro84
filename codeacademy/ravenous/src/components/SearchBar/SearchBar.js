import React from 'react';
import './SearchBar.css';
//import App from './App';
//import {searchYelp} from './App';


let sortByOptions = {
  "Best Match": 'best_match',
  "Highest Rated": 'rating',
  "Most Reviewed": 'review_count'
};

class SearchBar extends React.Component {

  constructor(props){
    super(props)
    this.state = { term:'',
                   location:'',
                   sortBy:'best_match'
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  renderSortByOptions(){
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];

      console.log(sortByOptionValue);
      return <li
              className={this.getSortByClass(sortByOptionValue)}
              onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
              key ={sortByOptionValue}
              >{sortByOption}</li>;
    });
  }


// returns current css class for sorting option
  getSortByClass(sortByOption){
    if(this.state.sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  }

// sets the state of the sorting option
  handleSortByChange(sortByOption){
    this.setState({sortBy: sortByOption});
}

  handleTermChange(e){
    this.setState({term: e.target.value});
  }

  handleLocationChange(e){
    this.setState({location: e.target.value});
  }

  handleSearch(e){
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    e.preventDefault();
  }

  render() {
    return (
<div className="SearchBar" >
  <div className="SearchBar-sort-options">
    <ul>
      {this.renderSortByOptions()}
    </ul>
  </div>
  <div className="SearchBar-fields">
    <input placeholder="Search Businesses" onChange={this.handleTermChange}/>
    <input placeholder="Where?" onChange={this.handleLocationChange}/>
  </div>
  <div className="SearchBar-submit" >
    <a onClick={this.handleSearch}>Lets Go</a>
  </div>
</div>
);
}
}


export default SearchBar;
