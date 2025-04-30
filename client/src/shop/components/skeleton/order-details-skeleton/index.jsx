import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';

export const OrderDetailsSkeleton = () => {
  return (
    <div className="order-details-container p-6">
      <div className="order-summary-tracking-grid">
        {/* Order Summary Skeleton */}
        <Card className="mb-4 shadow-2 order-details-card">
          <Skeleton width="80%" height="2rem" className="mb-3" />
          <Skeleton width="60%" className="mb-2" />
          <Skeleton width="50%" className="mb-2" />
          <Skeleton width="70%" className="mb-2" />
          <Skeleton width="40%" className="mb-2" />
          <Skeleton width="60%" className="mb-2" />
          <Skeleton width="50%" className="mb-2" />
        </Card>

        {/* Tracking Timeline Skeleton */}
        <Card className="shadow-2 order-details-card mb-4">
          <Skeleton width="60%" height="2rem" className="mb-4" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex align-items-center mb-4">
              <Skeleton shape="circle" size="2rem" className="mr-3" />
              <div className="flex flex-column">
                <Skeleton width="8rem" className="mb-1" />
                <Skeleton width="6rem" />
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Shipping Info Skeleton */}
      <Card className="shadow-2 order-details-card mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Skeleton width="70%" className="mb-2" />
            <Skeleton width="60%" className="mb-2" />
            <Skeleton width="80%" className="mb-2" />
          </div>
          <div>
            <Skeleton width="100%" className="mb-2" />
            <Skeleton width="80%" className="mb-2" />
          </div>
        </div>
      </Card>

      {/* Product Cards Skeleton */}
      <Card className="shadow-2 order-details-card">
        <div className="products-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="product-card">
              <Skeleton width="100%" height="160px" className="mb-3" />
              <Skeleton width="70%" className="mb-2" />
              <Skeleton width="40%" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default OrderDetailsSkeleton;
