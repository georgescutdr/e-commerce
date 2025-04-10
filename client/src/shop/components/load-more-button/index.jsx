import React from 'react';
import { Button } from 'primereact/button';
import './load-more-button.css'

export const LoadMoreButton = ({ onClick, loading }) => {
  return (
    <div className="load-more-container">
      <Button 
        label={loading ? 'Loading...' : 'Load More'} 
        icon={loading ? 'pi pi-spinner pi-spin' : 'pi pi-arrow-down'}
        onClick={onClick} 
        className="load-more-btn p-button-outlined p-button-rounded"
        disabled={loading} 
      />
    </div>
  );
};
