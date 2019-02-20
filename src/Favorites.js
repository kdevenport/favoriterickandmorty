import React, { Component } from 'react';
import axios from 'axios';



class Favorites extends Component {
    constructor(props) {
      super(props);
      this.state = {
        favoriteCharacterIDs: [],
        favoriteCharacters: [],
        nameChangeValue: ''
      };
      this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            favoriteCharacters: props.favoriteCharacterIDs
        })
    }
    handleChange(event) {
        this.setState({
            nameChangeValue: event.target.value
        });
    }
    render(){
        const favoriteCharactersWithTags = this.state.favoriteCharacters.map((favorite, index) => (
        <div key={favorite.id}>
          <div><img alt='' src={favorite.image} /></div>
          <div>Name: {favorite.name} </div>
          <div>Status: {favorite.status}</div>
          <div>Species: {favorite.species}</div>
          <div>Gender: {favorite.gender}</div>
          <button onClick = {() => this.props.deleteFromFavorites(index)}>Delete</button>
          <br></br>
          <button onClick = {() => this.props.updateNameInFavorites([index, this.state.nameChangeValue])}>Change Name</button>
            <form>
                <label>
                    New Name: 
                    <input type="text" value={this.state.nameChangeValue} onChange={this.handleChange}/>
                </label>
            </form>
          <br></br>
          <br></br>
        </div>
        ))
        return(
            <div>
               {favoriteCharactersWithTags}
            </div>
        )
    }
}
export default Favorites;