import React, { useContext,useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';


const PlaceOrder = () => {

  const [data,setData]=useState({
    first_name:"",
    last_name:"",
    email:"",
    street:"",
    zip_code:"",
    country:"",
    city:"",
    state:""
  })
  

  const onChangeHandler=(e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }
  const { getTotalCartAmount,cartItems,food_list,url,token } = useContext(StoreContext);
  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    let orderItems=[]
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo.quantity=cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    try{
      let response= await axios.post(url+'/api/order/place',orderData,{headers:{token}})
      console.log(response.data)
      const {session_url}=response.data
      window.location.replace(session_url)
    }
    catch(err){
      console.log(err)
    }
    console.log(orderItems)
  }

  return (
    <div className="place-order-container">
      {/* Delivery Information Section */}
      <div className="delivery-information">
        <h2>Delivery Information</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="input-group">
            <input name="first_name" value={data.frist_name} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="First Name" />
            <input name="last_name" value={data.last_name} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="Last Name" />
          </div>
          <input name="email" value={data.email} onChange={(e)=>onChangeHandler(e)} type="email" placeholder="Email address" />
          <input type="text" placeholder="Street" />
          <div className="input-group">
            <input name="city" value={data.city} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="City" />
            <input name="state" value={data.state} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="State" />
          </div>
          <div className="input-group">
            <input name="zip_code" value={data.zip_code} onChange={(e)=>onChangeHandler(e)}type="text" placeholder="Zip Code" />
            <input name="country" value={data.country} onChange={(e)=>onChangeHandler(e)} type="text" placeholder="Country" />
          </div>
          <input type="tel" placeholder="Phone" />
        </form>
      </div>

      {/* Cart Totals Section */}
      <div className="cart-totals">
        <h2>Cart Totals</h2>
        <div className="totals-row">
          <p>Subtotal</p>
          <p>₹{getTotalCartAmount()}</p>
        </div>
        <div className="totals-row">
          <p>Delivery Fee</p>
          <p>₹{deliveryFee}</p>
        </div>
        <div className="totals-row total">
          <p>Total</p>
          <p>₹{total}</p>
        </div>
        <button onClick={onSubmitHandler}  type="submit"className="proceed-btn">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
