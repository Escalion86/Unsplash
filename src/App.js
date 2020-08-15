import React, {Component} from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import GeneralPage from './pages/general';
import Header from './components/header';
import AuthPage from './pages/auth';

import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

const unsplash = new Unsplash({ 
  accessKey: "SB6Seq-YN5XjInu5sr9PEpxQbE5OmUYkpzigjwcg50k",
  secret: "b9tVIsp0cErEqtwEavBWGn61cX2_8F5NypHlaQRzFl0",
  callbackUrl: "http://unsplash.escalion.ru"
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes"
]);

const code = window.location.search.split('code=')[1];

if (!code) {
  window.location.assign(authenticationUrl);
} else {
  unsplash.auth.userAuthentication(code)
    .then(res => res.json())
    .then(json =>
      {
        localStorage.setItem("unsplash-authAC-code", json.access_token);
        unsplash.auth.setBearerToken(json.access_token);
        // Теперь можно сделать что-то от имени пользователя
        // Например, поставить лайк фотографии
        // unsplash.photos.likePhoto("kBJEJqWNtNY");
      });
}

//    window.location.assign(authenticationUrl);

// if (localStorage.getItem("unsplash-authAC-code") === null) {
//   const Unsplash = require('unsplash-js').default;
//   const unsplash = new Unsplash({ 
//     accessKey: "SB6Seq-YN5XjInu5sr9PEpxQbE5OmUYkpzigjwcg50k",
//     secret: "b9tVIsp0cErEqtwEavBWGn61cX2_8F5NypHlaQRzFl0",
//     callbackUrl: "unsplash.escalion.ru"
//   });
//   const authenticationUrl = unsplash.auth.getAuthenticationUrl([
//     "public",
//     "write_likes"
//   ]);
// }

// const code = 'Sg1FeZLyyqk6_ogRy7AlaS0tAsPEoJIMOeH6IyDJ2hg';

// unsplash.auth.userAuthentication(code)
//   .then(res => res.json())
//   .then(json =>
//     {
//       unsplash.auth.setBearerToken(json.access_token);
//       console.log(json);
//     })

// Теперь можно сделать что-то от имени пользователя
// Например, поставить лайк фотографии
//unsplash.photos.likePhoto("kBJEJqWNtNY");
// unsplash.photos.getPhoto('AHtS75VG5vQ')
// .then(toJson)
// .then(json => {
//   console.log(json);
// })
//});

export default class App extends Component {

  state = {
    photosId: []
  }

  searchPhotos = (str) => {
    unsplash.search.photos(str, 1)
    .then(toJson)
    .then(json => {
      console.log(json);
      this.setState((state) => {
        return {
          photosId: this.formArrPhotosId(json)
        }
      })
    });
  }
  
  formArrPhotosId = (json) => {
    return json.results.map((item) => {
      return item.id;
    });
  }

  componentDidMount() {
    this.searchPhotos("cats");
  }

  render () {   
    return(
      <section className="App">  
        <Router>  
          <Route path="/" component={Header} />                
          <Route exact path="/" component={() => <GeneralPage unsplash={unsplash} photosId={this.state.photosId} />} />        
          <Route exact path="/about" component={AboutPage} />        
          <Route exact path="/auth" component={AuthPage} />                 
        </Router>
      </section> 
  )}
};

const AboutPage = () => {
  return (
    <h3>About Page</h3>
  );
};
