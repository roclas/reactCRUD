import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Home from './pageComponents/Home';
import About from './pageComponents/About';
import Contact from './pageComponents/Contact';
import Error from './pageComponents/Error';
import Navigation from './pageComponents/Navigation';
import Listing from './pageComponents/Listing';
import MyDetail from './components/MyDetail';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
             <Route path="/contact" component={Contact}/>
             <Route path="/listing" component={Listing}/>
	     <Route exact path="/detail/:id" component={MyDetail} />
             <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;
