import React, {Component} from "react"
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
export default class Pokemon extends Component
{
    constructor(props) {
        super(props);
        this.state=
            {
                renderData:[],
            }
    }
    componentDidMount() {
        this.loadData()
    }

    loadData(){
        fetch(this.props.renderData.url)
            .then(data => data.json())
            .then(conData => this.setState({renderData: [conData]}))
    }

    render() {
        this.loadData();
        var PokemonDetails = this.state.renderData.map((Pokemon)=>
        {
            // console.log(Pokemon.id);
            return(
                <div key={Pokemon.id}>
                    <img src={Pokemon.sprites.front_default} alt=""/>
                    <p>{Pokemon.name}</p>
                </div>
            )
        });
        return (
            <p>
                <Link>{PokemonDetails}</Link>
            </p>
        );
    }
}