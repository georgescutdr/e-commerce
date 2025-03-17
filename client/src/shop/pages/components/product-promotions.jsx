import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'

export const ProductPromotions = ({promotions}) => {

    const promotionsList = promotions.map((promotion) => {
    	let promotionValue = promotion.type == 'percent' ? promotion.value + '%' : <sup>$</sup> + promotion.value

        return (
            <div className="p-2" key={ promotion.name }>
                <Stack direction="horizontal" gap={3}>
                    <div className="p-2">
                        { promotion.type == 'percent' ? '%' : '$' }
                    </div>
                    <div className="p-2">
                        <Stack gap={3}>
                            <div className="p-2">
                                <Stack direction="horizontal" gap={3}>
                                	<div className="p-2">
                                        <h4>
                                		-{promotion.type == 'value' && <sup>$</sup>}{ promotion.value }{promotion.type == 'percent' && <span>%</span>}
                                        </h4>
                                	</div>
                                	<div className="p-2 ms-auto">
                                		<a href="">see the offer</a>
                                	</div>	
                                </Stack>
                             </div>
                             <div className="p-2">
                                { promotion.description }
                             </div>
                        </Stack>
                    </div>
                </Stack>
            </div>
        ) 
    })

    return (
        <Stack gap={3}>
            { promotionsList } 
        </Stack>
    )
}
