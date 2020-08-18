import React, {Component} from 'react';
import PhotoList from '../components/photoList';

import './general.css';

export default class GeneralPage extends Component {
    
    render() {
        return (
            <section className="general">
                <h3>Home Page</h3>
                <PhotoList 
                    searchPhotos={this.props.searchPhotos} 
                    photos={this.props.photos} 
                    setLike={this.props.setLike}
                />
            </section>
        );
    }
};