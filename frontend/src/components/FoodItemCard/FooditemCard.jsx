import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './FoodItemCard.css'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'

const FoodItemCard = ({id,name,price,image,description}) => {
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
  return (
    <div className='food-item-card'>
        <div className='food-item-image-container'>
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {
              !cartItems[id]
              ?<img src={assets.add_icon_white} className='add' onClick={()=>addToCart(id)}/>
              :<div className='food-item-counter'>
                <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} alt=""/>
                <p>{cartItems[id]}</p>
                <img src={assets.add_icon_green} onClick={()=>addToCart(id)} />
              </div>
            }
        </div>
        <div className='food-item-info'>
            <div className='food-item-rating'></div>
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>${price}</p>
    </div>
    
  )
}

export default FoodItemCard