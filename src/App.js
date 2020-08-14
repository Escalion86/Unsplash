import React from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import GeneralPage from './pages/general';
import Header from './components/header';
import AuthPage from './pages/auth';

import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

// const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({ 
  accessKey: "SB6Seq-YN5XjInu5sr9PEpxQbE5OmUYkpzigjwcg50k",
  secret: "b9tVIsp0cErEqtwEavBWGn61cX2_8F5NypHlaQRzFl0",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
      "public",
      "write_likes"
    ]);

   window.location.assign(authenticationUrl);

const code = 'Sg1FeZLyyqk6_ogRy7AlaS0tAsPEoJIMOeH6IyDJ2hg';

unsplash.auth.userAuthentication(code)
  .then(res => res.json())
  .then(json =>
    {
      unsplash.auth.setBearerToken(json.access_token);
      console.log(json);
    })

// Теперь можно сделать что-то от имени пользователя
// Например, поставить лайк фотографии
//unsplash.photos.likePhoto("kBJEJqWNtNY");
// unsplash.photos.getPhoto('AHtS75VG5vQ')
// .then(toJson)
// .then(json => {
//   console.log(json);
// })
//});

const searchPhotos = (str) => {
  unsplash.search.photos(str, 1)
  .then(toJson)
  .then(json => {
    formArrPhotosId(json);
  });
}

const formArrPhotosId = (json) => {
  json.results.map((item) => {
    return item.id;
  });
}

const App = () => {
  return (
    <section className="App">
      
      <Router>  
        <Route path="/" component={Header} />                
        <Route exact path="/" component={() => <GeneralPage photosId={searchPhotos("cats")} />} />        
        <Route exact path="/about" component={AboutPage} />        
        <Route exact path="/auth" component={AuthPage} />                 
      </Router>
    </section> 
  );
};

const AboutPage = () => {
  return (
    <h3>About Page</h3>
  );
};

export default App;
