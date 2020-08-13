import React from 'react';
import Unsplash from 'unsplash-js';
import GeneralPage from './pages/general';
import Header from './components/header';

import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

// const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({ 
  accessKey: "SB6Seq-YN5XjInu5sr9PEpxQbE5OmUYkpzigjwcg50k",
  secret: "b9tVIsp0cErEqtwEavBWGn61cX2_8F5NypHlaQRzFl0",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

// const authenticationUrl = unsplash.auth.getAuthenticationUrl([
//   "public",
//   "write_likes"
// ]);

//window.location.assign(authenticationUrl);

const code = 'laJZLeDZhZq1jUOreY3Bx7vISjB6fYtzHK5iA4ZhPgc';

unsplash.auth.userAuthentication(code)
  .then(res => res.json())
  .then(json =>
    {
      unsplash.auth.setBearerToken(json.access_token);
      //console.log(json);
    })

// Теперь можно сделать что-то от имени пользователя
// Например, поставить лайк фотографии
//unsplash.photos.likePhoto("kBJEJqWNtNY");
unsplash.photos.getPhoto('AHtS75VG5vQ')
.then(res => res.json())
.then(json => {
  console.log(json);
})
//});

// unsplash.search.photos("dogs", 1, 10, { orientation: "portrait" })
//   .then(request => {
//     console.log(request)
//   })
  // .then(json => {
  //   // Your code
  // });

const App = () => {
  return (
    <section className="App">
      
      <Router>  
        <Route path="/" component={Header} />                
        <Route exact path="/" component={GeneralPage} />        
        <Route exact path="/about" component={AboutPage} />                         
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
