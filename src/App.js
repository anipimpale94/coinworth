import React, { Component } from 'react';
import coinWorthImageLogo from './logo.png';
import coinWorthTextLogo from './textLogo.jpg'
import './App.css';
import AppMain from './AppMain';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <div className="jumbotron">
          <div className="container-fluid">
            <div className="col-xl-4">
              <a href="#">
                <img alt="coinworth-logo" src={coinWorthImageLogo} className="App-logos"/>
                <img alt="coinworth-text-logo" src={coinWorthTextLogo} className="App-logo-name"/>
              </a>
            </div>  
          </div>
        </div>
        <AppMain />
      </div>
    );
  }
}

export default App;
/* <img alt="coin worth logo" className="App-logos" src={coinworth} />
 */