
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

export const parseAttributes = (str) => {
  let result = []
  let items = str.split(';')

  items.forEach((item) => {
    let parts = item.split(',')
    result.push({'id': parts[0], 'name': parts[1], 'value': parts[2]})
  })

  return result
}

export const parseOptions = (str) => {
  let result = []
  let items = str.split(';')

  items.forEach((item) => {
    let parts = item.split(',')
    result.push({'name': parts[0], 'description': parts[1]})
  })

  return result
}

export const parseImages = (str) => {
  let items = str.split(';')

  return items
}

export const parsePromotions = (str) => {
  let result = []
  let items = str.split(';')

  items.forEach((item) => {
    let parts = item.split(',')
    result.push({name: parts[0], value: parts[1], type: parts[2], description: parts[3]})
  })

  return result
}

export const parseVouchers = (str) => {
  let result = []
  let items = str.split(';')

  items.forEach((item) => {
    let parts = item.split(',')
    result.push({name: parts[0], value: parts[1]})
  })

  return result
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