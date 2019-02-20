import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';
import FavHeader from './FavHeader';
import Favorites from './Favorites';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();

    this.state = {
      character: '',
      favoriteCharacterIDList: [],
      favoriteCharacters: []
    }
  }
  componentDidMount(){
    this.getCharacterList();
    this.getFavorites();
  }
  getCharacterList = () => {
    const min = 1;
    const max = 493;
    const rand = Math.floor(min + Math.random() * (max - min));
    axios.get("https://rickandmortyapi.com/api/character/" + rand)
    .then((response) => {
      this.setState({
      character: response.data
      })
   })
  }
  getFavorites = () => {
    axios.get("http://localhost:3001/api/favorites").then(response =>{
      this.setState({
        favoriteCharacterIDList: response.data
      })
    })
  }
  addFavorites = () => {
    let character = this.state.character
    axios.post("http://localhost:3001/api/favorites", character).then(response =>{
      this.setState({
        favoriteCharacterIDList: response.data
      })
    })
  }
  deleteFavorites = (id) => {
    axios.delete("http://localhost:3001/api/favorites/" + id).then(response =>{
      this.setState({
        favoriteCharacterIDList: response.data
      })
    })
  }
  updateNameInFavorites = (indexNameArray) => {
    let index = indexNameArray[0];
    let name = indexNameArray[1];
    axios.patch("http://localhost:3001/api/favorites/" + index, { data: name }).then(response => {
      this.setState({
        favoriteCharacterIDList: response.data
      })
    })
  }
  render(){
    return (
      <div className="App">
        <Header />
        <br></br>
        <div>
          <div><img alt='' src={this.state.character.image} /></div>
          <div>Name: {this.state.character.name}</div>
          <div>Status: {this.state.character.status}</div>
          <div>Species: {this.state.character.species}</div>
          <div>Gender: {this.state.character.gender}</div>
          <button onClick = {event => this.getCharacterList(event)}>Get New Character</button>
          <br></br>
          <button onClick = {event => this.addFavorites(event)}>Add to Favorites</button>
          <br></br>
        </div>
        <FavHeader />
        <Favorites favoriteCharacterIDs={this.state.favoriteCharacterIDList}
        deleteFromFavorites={id => this.deleteFavorites(id)}
        updateNameInFavorites={id => this.updateNameInFavorites(id)}
        />
        
      </div>
    )
  }
}
export default App;
