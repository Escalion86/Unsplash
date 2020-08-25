import React, {Component} from 'react';
import { connect } from 'react-redux';
import Unsplash, { toJson } from 'unsplash-js';
import PhotoList from './components/photoList';
import Header from './components/header';
import PhotoPage from './components/photoPage';

import { setLike, searchStart, searchFinish } from './actions';

import { Link, BrowserRouter as Router, Route, useParams } from 'react-router-dom';

import './App.css';

let token = null;

const unsplash = new Unsplash({ 
  accessKey: "SB6Seq-YN5XjInu5sr9PEpxQbE5OmUYkpzigjwcg50k",
  secret: "b9tVIsp0cErEqtwEavBWGn61cX2_8F5NypHlaQRzFl0",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
  //callbackUrl: "http://picso.escalion.ru"
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes"
]);

//Проверяем токен и если он есть, то авторизируемся по нему напрямую
token = localStorage.getItem("unsplash-authAC-code");
if (token) {
  unsplash.auth.setBearerToken(token);
//если токена нет, то смотрим получен ли код авторизации и если код не получен, то получаем код переадресацией
} else {
  const code = window.location.search.split('code=')[1];
  //const code = "WErxFguoBXoYFYvA9EiAFi27LuNwCxaQhEzryVXuZjU";
  if (!code) {
    window.location.assign(authenticationUrl);
  } else {
    unsplash.auth.userAuthentication(code)
      .then(res => res.json())
      .then(json =>
        {
          token = json.access_token;
          localStorage.setItem("unsplash-authAC-code", token);
          unsplash.auth.setBearerToken(token);
        });
  }
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
  // searchPhotos = (searchText) => {
  //   this.setState({searchText}, () => this.loadPhotos(true));
  // }

  // searchPhotos = (searchText) => {
  //   this.setSearchText(searchText);
  //   this.loadPhotos();
  // }

  // getPhoto(id) {
  //   unsplash.photos.getPhoto(id)//"pFqrYbhIAXs"
  //   .then(toJson)
  //   .then(json => {
  //     return json;
  //   })
  // }
  
  formArrPhotos = (json) => {
    if ("results" in json) {
      return json.results.map((item) => {
        return item;
      });
    } else {
      return json.map((item) => {
        return item;
      });
    }
  }

  // componentDidMount() {
  //   console.log('App Did Mount')
  //   this.loadPhotos(true);
  // }

  // setLike(id, status) {
  //   const doAction = (promise) => {
  //     promise.then(toJson)
  //       .then(res => {
  //       //if (res.ok) {      
  //         this.setState((state) => {           
  //           const newPhotos = this.state.photos.map((photo) => {
  //             if (id === photo.id) {
  //               return {...photo, ...res.photo};
  //             }
  //             return photo;
  //           });
  //           return {
  //             photos: newPhotos,
  //           }
  //         });       
  //       //}
  //     })
  //   }
  //   if (status) {
  //     console.log('promise to like');
  //     doAction(unsplash.photos.likePhoto(id));      
  //   } else {
  //     console.log('promise to unlike');
  //     doAction(unsplash.photos.unlikePhoto(id));
  //   }
  // }

  getPhotoFromState = (id) => {
    let res = null;
    this.props.state.photos.forEach((photo) => {
      if (photo.id === id) {
        res = photo;
      }
    });
    return res;
  }

  // loadPhotos = (state, newLoad = false, count = 10) => {
  //   const {searchText, pagesLoad, pagesLoading, photos} = state;

  //   const doAction = (promise, newLoad) => {
  //     this.setState({pagesLoading: true});

  //     promise.then(toJson)
  //     .then(json => {
  //       console.log('loadedPhotos json: ');
  //       console.log(json);
  //       this.setState((state) => {
  //         if (newLoad) {
  //           return {
  //             photos: this.formArrPhotos(json),
  //             pagesLoad: 1,
  //             pagesLoading: false
  //           }
  //         } else {
  //           return {
  //             photos: [...photos, ...this.formArrPhotos(json)],
  //             pagesLoad: (pagesLoad + 1),
  //             pagesLoading: false
  //           }
  //         }
  //       });
  //     });
  //   }

  //   if (!pagesLoading) {
  //     console.log('loading page ' + (newLoad ? 1 : (pagesLoad + 1)));
  //     console.log('search word: ' + searchText)
  //     if (searchText && searchText !== '') {
  //       doAction(unsplash.search.photos(searchText, newLoad ? 1 : (pagesLoad + 1), count), newLoad);    
  //     } else {
  //       doAction(unsplash.photos.listPhotos(newLoad ? 1 : (pagesLoad + 1), count, "latest"), newLoad);
  //     }
  //   }
  // }

  componentDidMount() {
    this.loadPhotos();
  }

  newLoadPhotos = (searchText) => {
    this.loadPhotos(this.props.dispatch, searchText, true)
  }

  nextLoadPhotos = () => {
    this.loadPhotos(this.props.dispatch, this.props.state.searchText, false)
  }

  loadPhotos = (dispatch = this.props.dispatch, searchText = this.props.state.searchText, newLoad = false) => {  
    if (!this.props.state.pagesLoading) {
      dispatch(searchStart(searchText, newLoad));
      console.log('TEST ' + this.props.state.pagesLoad);
      console.log(newLoad);

      if (searchText && searchText !== '') {
        return unsplash.search.photos(searchText, this.props.state.pagesLoad + 1, 10)
              .then(toJson)
              .then(json => {
                console.log('loadedPhotos json: ');
                console.log(json);
                dispatch(searchFinish(this.formArrPhotos(json), newLoad));
              });;
      } else {
        
        return unsplash.photos.listPhotos( this.props.state.pagesLoad + 1, 10, "latest")
              .then(toJson)
              .then(json => {
                console.log('loadedPhotos json: ');
                console.log(json);
                dispatch(searchFinish(this.formArrPhotos(json), newLoad));
              });;
      }
    }
  }

  render () {   
    console.log('App render');
    const {state, setLike} = this.props;

    // if (state.pagesLoading) {
    //   this.loadPhotos();
    // }

    console.log(this.props);
    return(
      <div className="App">  
        <Router>  
          <Route path="/" component={() => 
            <Header 
              searchText={state.searchText}
              newSearch={this.newLoadPhotos.bind(this)} />
          } />                
          <Route exact path="/" component={() => 
            <PhotoList 
              photos={state.photos}
              nextSearch={this.nextLoadPhotos.bind(this)}
              //loadPhotos={loadPhotos}
              setLike={setLike} />
          } />  
          <Route exact path="/photo/:id" component={(props) => 
            <PhotoPage 
              //unsplash={unsplash} 
              photo={this.getPhotoFromState(props.match.params.id)}
              //id={props.match.params.id}
              //setLike={this.setLike.bind(this)}
           />
          } />
        </Router>
      </div> 
  )}
};

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLike: (id, liked) => dispatch(setLike(id, liked)),
    searchStart: (searchText, newLoad) => dispatch(searchStart(searchText, newLoad)),
    searchFinish: (photos, newLoad) => dispatch(searchFinish(photos, newLoad)),
    dispatch: (action) => dispatch(action)
    //loadPhotos: () => dispatch(loadPhotos())
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
