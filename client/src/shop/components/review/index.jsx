import React from 'react';
import { Rating } from 'primereact/rating';
import { Avatar } from 'primereact/avatar';
import { formatDistanceToNow } from 'date-fns'; // To format the date nicely
import { Skeleton } from 'primereact/skeleton'; // Importing Skeleton
import 'primereact/resources/primereact.min.css'; // Optional, if not already included
import 'primeicons/primeicons.css'; // Optional, if not already included
import './review.css'; // Import the custom CSS

export const Review = ({ item }) => {
  // Format the review date using `date-fns` library
  const formattedDate = item.date ? formatDistanceToNow(new Date(item.date), { addSuffix: true }) : '';

  // Check if the review is loading
  const isLoading = item.loading;

  return (
    <div key={item.id + item.title} className="review-item border-b border-gray-300 p-4 mb-4 rounded-lg shadow-lg">
      {/* Skeleton Loader for Review when loading */}
      {isLoading ? (
        <div className="flex items-center gap-3">
          <Skeleton circle width="50px" height="50px" />
          <div className="flex flex-col w-full">
            <Skeleton width="80%" height="20px" />
            <Skeleton width="60%" height="15px" />
            <Skeleton width="100%" height="15px" />
            <Skeleton width="100%" height="15px" />
          </div>
        </div>
      ) : (
        <>
          {/* Review Title */}
          <div className="review-title">
            <h2 className="text-xl font-semibold text-gray-800">{item.title || 'Review Title'}</h2>
          </div>

          {/* User Avatar and Rating */}
          <div className="review-header">
              <Avatar
                image={item.user_avatar || '/images/default-avatar.png'}
                size="large"
                shape="circle"
                className="review-avatar"
              />
              <div className="review-user-info">
                <span className="review-name">
                  {(item.user_array?.[0]?.first_name || '') + ' ' + (item.user_array?.[0]?.last_name || '')}
                </span>
                <span className="review-date">{formattedDate}</span>
              </div>
              <div className="review-rating">
                <Rating 
                  value={item.rating} 
                  cancel={false} 
                  readOnly 
                  stars={5} 
                  className="text-yellow-500" 
                />
              </div>
            </div>


          {/* Review Comment */}
          <p className="text-gray-700">{item.description}</p>
        </>
      )}
    </div>
  );
};
