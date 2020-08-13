import React from 'react';
import PhotoList from '../components/photoList';

import './general.css';

const GeneralPage = () => {
    return (
        <section className="general">
            <h3>Home Page</h3>
            <PhotoList />
        </section>
    );
};

export default GeneralPage;