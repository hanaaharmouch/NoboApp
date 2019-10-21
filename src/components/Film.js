import React, {Component} from 'react'
import {Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import no from '../images/no.jpg'
import StarRatings from 'react-star-ratings';



export default class Film extends Component{
    constructor(props){
        super(props)
        this.state={
            thisFilm:[],
            possible:false,
            source:''
        };
        
    }
    display=async () => {
        const film=[];
        let src =''
        const api_call =await fetch(`https://api.tvmaze.com/search/shows?q=test`);
        const data = await api_call.json();
        let id =this.props.match.params.filmId;
        const found = data.map(function(element) {
                 if (element.show.id == id ) return film.push(element);
             });
        
        this.setState({
            thisFilm : film,
            possible:true,
        
         });
         if(this.state.thisFilm[0].show.image=== null){
            src=no
        }else{
            src=this.state.thisFilm[0].show.image.original
        }
        this.setState({
            
            source:src
         });
        console.log(this.state.thisFilm[0].show.name);
        
    }
    
  

    render(){
        return (
        <body>
            <h3 className="styleFont">{this.props.match.params.filmName}</h3>
                <a onClick={this.display()} ></a>
                

                {this.state.possible ? (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <img src={this.state.source}  />
                             </div>
                             <div className="col-md-7 white">
                                <p className="details">Details</p>
                                <h2><span className="size"> Name : </span><span className="size1">{this.state.thisFilm[0].show.name}</span></h2>
                                <h2><span className="size"> Type : </span> <span className="size1">{this.state.thisFilm[0].show.type}</span></h2>
                                <h2><span className="size"> Language : </span><span className="size1"> {this.state.thisFilm[0].show.language}</span></h2>
                                <h2><span className="size"> Description : </span><span className="size1">{this.state.thisFilm[0].show.summary}</span></h2>
                                <h2><span className="size"> Network : </span><span className="size1">{this.state.thisFilm[0].show.network.name}</span></h2>

                             </div>
                         </div>
                    </div>
                    
                ) : (
                    <h3 >Loading...</h3>
                 )}
                
                
       </body>
        )
    }
}