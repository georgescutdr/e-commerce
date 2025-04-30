
export const randomKey = () => {
  return window.crypto?.randomUUID?.() || `key-${Math.random().toString(36).substr(2, 9)}`
}

export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const pad = (n) => n.toString().padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};


export const computePrice = (price, promotions) => {
	let percentAmount = 0
	let valueAmount = 0

	let total = 0

	if(promotions.length) {
		promotions.each((promotion) => {
			if(promotion.type == 'percent') {
				percentAmount += promotion.value
			} else {
				valueAmount += promotion.value
			}
		})
	}

	return 0
}


export const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
}

export const deleteImage = () => {
  
}

export const applyPromotions = (promotions = [], originalPrice) => {
    let finalPrice = originalPrice;
    const now = new Date();

    // Remove duplicates by promotion.id
    const uniquePromotions = promotions.filter(
        (promotion, index, self) =>
            index === self.findIndex(p => p.id === promotion.id)
    );

    uniquePromotions.forEach(promotion => {
        const startDate = new Date(promotion.start_date);
        const endDate = new Date(promotion.end_date);

        const isActive = now >= startDate && now <= endDate;

        if (isActive) {
            if (promotion.type === 'percent') {
                finalPrice -= originalPrice * (promotion.value / 100);
            } else if (promotion.type === 'value') {
                finalPrice -= promotion.value;
            }
        }
    });

    // Ensure price is not negative
    return Math.max(0, parseFloat(finalPrice.toFixed(2)));
};

export const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0 || !reviews?.[0]) return 0;

    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const average = total / reviews.length;

    return parseFloat(average.toFixed(1)); // returns something like 4.3
};

export const getPromotionLabel = (promotions = []) => {
    if (!promotions || !promotions.length) return null;

    const now = new Date();

    // Deduplicate by promotion.id
    const uniquePromos = Array.from(
        new Map(promotions.filter(p => p && p.id).map(p => [p.id, p])).values()
    );

    let percentTotal = 0;
    let valueTotal = 0;

    uniquePromos.forEach(promo => {
        const startDate = new Date(promo.start_date);
        const endDate = new Date(promo.end_date);

        const isActive = (!promo.start_date || startDate <= now) &&
                         (!promo.end_date || endDate >= now);

        if (isActive) {
            if (promo.type === 'percent') {
                percentTotal += Number(promo.value);
            } else if (promo.type === 'value') {
                valueTotal += Number(promo.value);
            }
        }
    });

    if (percentTotal > 0) {
        return `-${percentTotal}%`;
    } else if (valueTotal > 0) {
        return `-$${valueTotal.toFixed(2)}`;
    } else {
        return null;
    }
};


export const slugify = (str) => {
    return str ? str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // remove special characters
        .replace(/\s+/g, '-') : str    // replace spaces with dashes
}

export const makeItemUrl = (item) => {
    if (!item) return '';

    if(item.slug) return item.slug;

    const brand = item.brand_array?.[0]?.name || '';
    const productName = item.name || '';

    return `${slugify(brand)}-${slugify(productName)}`;
};

export const makeItemTitle = (item) => {
    if (!item) return '';

    const brand = item.brand_array?.[0]?.name || '';
    const productName = item.name || '';

    const toTitleCase = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // remove special characters
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    return `${toTitleCase(brand)} ${toTitleCase(productName)}`;
};

export const getStockLabel = (quantity) => {
    if (quantity > 5) {
        return <div className="stock-green">In stock</div>;
    } else if (quantity > 1) {
        return <div className="stock-red">The last {quantity} products</div>;
    } else if (quantity === 1) {
        return <div className="stock-red">The last product in stock</div>;
    } else {
        return <div className="stock-red">Out of stock</div>;
    }
};

//display products in stack or grid
//add has voucher label on product card
//pagination for items

