import React, {Component} from 'react';
import { connect } from 'react-redux';
import Unsplash, { toJson } from 'unsplash-js';
import PhotoList from './components/photoList';
import Header from './components/header';
import PhotoPage from './components/photoPage';

import { setLike, waitLike, searchStart, searchFinish } from './actions';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

let token = null;

const unsplash = new Unsplash({ 
  accessKey: "SB6Seq-YN5XjInu5sr9PEpxQbE5OmUYkpzigjwcg50k",
  secret: "b9tVIsp0cErEqtwEavBWGn61cX2_8F5NypHlaQRzFl0",
  //allbackUrl: "urn:ietf:wg:oauth:2.0:oob"
  callbackUrl: "http://picso.escalion.ru"
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes"
]);

//Проверяем токен и если он есть, то авторизируемся по нему напрямую
//token = localStorage.getItem("unsplash-authAC-code");
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
          token = json.access_token;
          localStorage.setItem("unsplash-authAC-code", token);
          unsplash.auth.setBearerToken(token);
        });
  }
//}

//    window.location.assign(authenticationUrl);

export default class App extends Component {

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

  setLike_func(id, status) {
    const doAction = (promise) => {
      promise.then(toJson)
        .then(res => {      
          this.props.state.photos.forEach((photo) => {
            if (id === photo.id) {
              this.props.dispatch(setLike(id, res.photo.liked_by_user, res.photo.likes));
            }
          });
      })
    }
    this.props.dispatch(waitLike(id))
    if (status) {
      console.log('promise to like');
      doAction(unsplash.photos.likePhoto(id));      
    } else {
      console.log('promise to unlike');
      doAction(unsplash.photos.unlikePhoto(id));
    }
  }

  getPhotoFromState = (id) => {
    let res = null;
    this.props.state.photos.forEach((photo) => {
      if (photo.id === id) {
        res = photo;
      }
    });
    return res;
  }

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
    const {state} = this.props;

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
              setLike={this.setLike_func.bind(this)} />
          } />  
          <Route exact path="/photo/:id" component={(props) => 
            <PhotoPage 
              photo={this.getPhotoFromState(props.match.params.id)}
              setLike={this.setLike_func.bind(this)}
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
    setLike: (id, liked, likes) => dispatch(setLike(id, liked, likes)),
    waitLike: (id) => dispatch(waitLike(id)),
    searchStart: (searchText, newLoad) => dispatch(searchStart(searchText, newLoad)),
    searchFinish: (photos, newLoad) => dispatch(searchFinish(photos, newLoad)),
    dispatch: (action) => dispatch(action)
  }
}

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
