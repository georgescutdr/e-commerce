import React, { useState, useEffect, useRef } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Button } from 'primereact/button';
import Axios from 'axios';
import { shopConfig } from '../../admin/config' 
import { Review } from './review'
import { LoadMoreButton } from './load-more-button'

export const Reviews = ({ itemId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To track if there are more reviews to load
  const [page, setPage] = useState(1); // To manage pagination
  const loaderRef = useRef(null); // Reference for lazy loading trigger

  useEffect(() => {
    // Fetch reviews when the component mounts or when the page changes
    const fetchReviews = async () => {
      setLoading(true);
      try {
          //`/api/products/${itemId}/reviews?page=${page}
        const response = await Axios.get(shopConfig.getItemsUrl, {params: {
            table: 'review',
            product_id: itemId
        }});
        const newReviews = response.data;
        console.log('reviews: ', response.data)
        
        if (newReviews.length === 0) {
          setHasMore(false); // No more reviews to load
        } else {
          setReviews((prevReviews) => [...prevReviews, ...newReviews]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [itemId, page]);

  // Lazy loading handler
  const handleLazyLoad = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1); // Increment page to load more reviews
    }
  };

  // IntersectionObserver for lazy loading trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLazyLoad();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef]);

  return (
    <div className="product-reviews">
      <h2>Customer Reviews</h2>
      
      {loading && <ProgressSpinner style={{ width: '50px', height: '50px' }} />}

      <div className="reviews-list">
        {reviews.map((review, index) => (
            <Review item={ review } key={review.id + index} />  
        ))}
      </div>

      {/* Lazy Load Trigger */}
      {hasMore && !loading && (
        <div ref={loaderRef} className="lazy-load-trigger">
            <LoadMoreButton onClick={ handleLazyLoad } loading={ loading } />
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="loading-spinner">
          <ProgressSpinner />
        </div>
      )}
    </div>
  );
};

