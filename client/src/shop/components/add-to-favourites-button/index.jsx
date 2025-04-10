import React from 'react';
import './add-to-favourites-button.css';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';


export const AddToFavouritesButton = ({item}) => {
    
    return (
        <>
            <Button
                label="Add to Favourites"
                icon="pi pi-heart"
                className="p-button-rounded p-button-outlined p-button-info add-to-favourites-btn"
                onClick={(e) => {
                    e.preventDefault(); // prevent link navigation
                    alert(`Added ${item.name} to fav`);
                }}
            />  
        </>
    );
};
