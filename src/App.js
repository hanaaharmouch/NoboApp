import React,{Component} from 'react';
import { link , Switch, Route} from 'react-router-dom'
import Welcome from './components/Welcome'
import Header from './components/Header'
import Footer from './components/Footer'
import {BrowserRouter as Router} from 'react-router-dom';
import Film from './components/Film';

class App extends Component {

  render(){
    return (
      
      <Router>
      <Header />
      <Switch>
      
      <Route exact path="/" component={Welcome} />
      <Route path="/Film/:filmId/:filmName" component={Film} />
      </Switch>
      <Footer />
      </Router>
    );
  }
}

export default App;
