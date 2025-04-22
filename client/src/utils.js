
export const randomKey = () => {
  return window.crypto?.randomUUID?.() || `key-${Math.random().toString(36).substr(2, 9)}`
}

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


export const capitalize = s => (s && String(s[0]).toUpperCase() + String(s).slice(1)) || ""

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

    promotions.forEach(promotion => {
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
    if(!promotions || !promotions.length) return null;

    const now = new Date();

    let percentTotal = 0;
    let valueTotal = 0;

    promotions.forEach(promo => {
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
}

export const makeItemUrl = (item) => {
    if (!item) return '';

    if(item.slug) return item.slug;

    const brand = item.brand_array?.[0]?.name || '';
    const productName = item.name || '';

    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '') // remove special characters
            .replace(/\s+/g, '-')     // replace spaces with dashes

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


