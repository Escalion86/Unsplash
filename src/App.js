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
  //callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
  callbackUrl: "http://picso.escalion.ru"
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes"
]);

//Проверяем токен и если он есть, то авторизируемся по нему напрямую
//const token = localStorage.getItem("unsplash-authAC-code");
//if (token) {
//  unsplash.auth.setBearerToken(token);
//если токена нет, то смотрим получен ли код авторизации и если код не получен, то получаем код переадресацией
//} else {
  const code = window.location.search.split('code=')[1];
  //const code = "WErxFguoBXoYFYvA9EiAFi27LuNwCxaQhEzryVXuZjU";
  if (!code) {
    window.location.assign(authenticationUrl);
  } else {
    unsplash.auth.userAuthentication(code)
      .then(res => res.json())
      .then(json =>
        {
          localStorage.setItem("unsplash-authAC-code", json.access_token);
          unsplash.auth.setBearerToken(json.access_token);
        });
  }
//}

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
    photos: [],
    searchText: 'cats',
    pagesLoad: 0,
    pagesLoading: false
  }

  listPhotos(newLoad = true) {
    if (!this.state.pagesLoading) {
      this.setState({pagesLoading: true});
      unsplash.photos.listPhotos(1, 10, "latest")
      .then(toJson)
      .then(json => {
        this.setState((state) => {
          let newPhotos = [];
          if (newLoad) {
            return {
              photos: this.formArrPhotos(json),
              pagesLoad: (this.state.pagesLoad + 1),
              pagesLoading: false
            }
          } else {
            return {
              photos: [...this.state.photos, ...this.formArrPhotos(json)],
              pagesLoad: (this.state.pagesLoad + 1),
              pagesLoading: false
            }
          }
          
          return {
            photos: newPhotos,
            pagesLoad: (this.state.pagesLoad + 1),
            pagesLoading: false
          }
        });
      });
    }
  }

  searchPhotos() {
    if (!this.state.pagesLoading) {
      this.setState({pagesLoading: true});
      unsplash.search.photos(this.state.searchText, (this.state.pagesLoad + 1))
      .then(toJson)
      .then(json => {
        this.setState((state) => {
          return {
            photos: [...this.state.photos, ...this.formArrPhotos(json)],
            pagesLoad: (this.state.pagesLoad + 1),
            pagesLoading: false
          }
        });
      });
    }
  }

  // getPhoto(id) {
  //   unsplash.photos.getPhoto(id)//"pFqrYbhIAXs"
  //   .then(toJson)
  //   .then(json => {
  //     return json;
  //   })
  // }
  
  formArrPhotos = (json) => {
    console.log(json);
    return json.results.map((item) => {
      return item;
    });
  }

  componentDidMount() {
    this.searchPhotos();
  }

  setLike(id, status) {
    const doAction = (promise) => {
      promise.then(toJson)
        .then(res => {
        //if (res.ok) {      
          this.setState((state) => {           
            const newPhotos = this.state.photos.map((photo) => {
              if (id === photo.id) {
                return {...photo, ...res.photo};
              }
              return photo;
            });
            return {
              photos: newPhotos,
            }
          });
          
        //}
      })
    }

    if (status) {
      console.log('promise to like');
      doAction(unsplash.photos.likePhoto(id));      
    } else {
      console.log('promise to unlike');
      doAction(unsplash.photos.unlikePhoto(id));
    }
  }

  render () {   
    console.log('App render');
    
    return(
      <section className="App">  
        <Router>  
          <Route path="/" component={Header} />                
          <Route exact path="/" component={() => 
            <GeneralPage 
              photos={this.state.photos}
              searchPhotos={this.searchPhotos.bind(this)}
              setLike={this.setLike.bind(this)}
            />} />        
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
