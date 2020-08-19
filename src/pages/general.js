import React, {Component} from 'react';
import PhotoList from '../components/photoList';

import './general.css';

export default class GeneralPage extends Component {
    
    render() {
        return (
            <section className="general">
                <h3>Home Page</h3>
                <PhotoList 
                    loadPhotos={this.props.loadPhotos} 
                    photos={this.props.photos} 
                    setLike={this.props.setLike}
                />
            </section>
        );
    }
};