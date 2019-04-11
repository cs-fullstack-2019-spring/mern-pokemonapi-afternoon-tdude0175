import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import './App.css';
import Pokemon from "./components/Pokemon";

class App extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                allPokemonData: [],
                PokemonPageData: [],
                url: "https://pokeapi.co/api/v2/pokemon",
            }
    }

    componentDidMount() {
        this.pageRender()
    }

    pageRender = () =>{

        fetch(this.state.url)
        .then(data => data.json())
        .then(conData => {
            console.log(conData);
            return this.setState({allPokemonData:conData,PokemonPageData: conData.results})}
        );
    };

    changeDisplay = (e) =>
    {

        this.setState({url: this.state.allPokemonData.next}, ()=>this.pageRender());
        // this.pageRender();
        console.log(this.state.allPokemonData.next);
    };

    changeDisplayPrior = (e) =>
    {
      if( this.state.allPokemonData.previous !== null)
      {
          this.setState({url: this.state.allPokemonData.previous}, ()=> this.pageRender())
      }

    };

    render() {
        var mappedPokemonData = this.state.PokemonPageData.map((pokemon,index) => {
            console.log(pokemon);
            return (
                <Pokemon key={index} renderData={pokemon}/>
            )
        });
        return (
            <div className="App">
                <Router>

                    <div className={"NavBar"}>

                        <Link to={"/"} onClick={ this.changeDisplayPrior}>Back</Link>

                        <Link to={"/"} onClick={ this.changeDisplay}>Next</Link>

                    </div>
                    <div className={"Section"}>
                        {mappedPokemonData}
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
