import React, {Component} from 'react'
import {Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions'; 
import no from '../images/no.jpg'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { GridList, GridTitle, GridTile } from 'material-ui/GridList'



export default class Welcome extends Component{

    constructor(props){
        super(props)
        let loggedIn=false
        this.state={
            store1:[],
        }
    }
    getFilm= async (e) => {
        e.preventDefault();
        const film = e.target.elements.film.value;
        console.log(film);
        const store=[];
        const api_call =await fetch(`https://api.tvmaze.com/search/shows?q=test`);
        const data = await api_call.json();
        const found = data.map(function(element) {
            if (element.show.name.toUpperCase().includes(film.toUpperCase())) return store.push(element);
            else;
        });
        if(store.length!=0){
            console.log(store);
            this.setState({
                store1 : store,
            });
            console.log(this.state.store1);
           
        }

        else{ 
            alert('Oups !!! film introuvable')
        }
    }
    displayFilms= () => {
        let Films=[];
        let src =''
        for(var i=0; i<this.state.store1.length ; i++){
            
            if(this.state.store1[i].show.image=== null){
                 src=no
            }else{
                 src=this.state.store1[i].show.image.medium
            }
            
           Films.push (
            <a href={"/Film/"+ this.state.store1[i].show.id +"/"+ this.state.store1[i].show.name} > 
           
            
            <GridTile title ={this.state.store1[i].show.name} >
            <img src={src} />
            </GridTile>
           
            </a>
            
            
        ) 
        }
        return Films;
    }

    render(){
        return (

          <body>
            <h1 className="styleFont"> Welcome to NoboFilms </h1>
            <form  onSubmit={this.getFilm} class="search">
            <Paper className="root">
            <IconButton className="iconButton" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                name="film"
                className="input"
                placeholder="Search your film here"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            
            <Divider className="divider" orientation="vertical" />
            
            </Paper>
            </form>
            <div className="w3-main w3-content w3-padding" style={{"max-width":"1200px" , "margin-top":"35px" , "color": "#fff"}}>

                <MuiThemeProvider>
                <GridList cols={5} >
                    {this.displayFilms()}
                    </GridList>
                </MuiThemeProvider>
            </div> 
          </body>
            
     
        )
    }
}