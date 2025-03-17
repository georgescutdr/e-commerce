import React from 'react'
import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
//import Carousel from 'react-multi-carousel' //https://www.npmjs.com/package/react-multi-carousel
import 'react-multi-carousel/lib/styles.css'
import { responsive } from '../../../utils'
import Image from 'react-bootstrap/Image'
import '../../shop.css'
import { Galleria } from 'primereact/galleria'

export const CarouselItems = ({items, type, productId, setPreviewImage}) => {
    const itemsList = items.map((item) => {
        return (
            <div key={ item }>
                {type == 'image' && (
                    <div>
                        <Image 
                            width={ 150 } 
                            src={ '/uploads/product/' + productId + '/' + item } 
                            onClick={() => setPreviewImage(item)} 
                            fluid 
                            />
                    </div>
                )}
                {type == 'product' && (
                    <div></div>
                )}
            </div>  
        )
    })

  /*  const itemTemplate = (item) => {
        console.log(item)
        return (
            <div className="p-galleria">
                <img src={`${item.itemImageSrc}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}  style={{ width: '100%' }} />
            </div>
    )}*/

    let responsiveOptions = {}
    let thumbnailTemplate = {}

    return (
        <div className="carousel-container">
           
        </div>
    )
}
