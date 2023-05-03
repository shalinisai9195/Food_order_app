import React, { useState,useEffect } from 'react'
import classes from './foodDetails.module.css'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {addProduct} from '../../redux/cartSlice'

const FoodDetails = () => {
  const[foodDetails,setFoodDetails] = useState('')
  const[quantity,setQuantity] = useState(1)
  const dispatch = useDispatch()
  const {id} = useParams()
  const {token} = useSelector((state)=> state.auth)
  //const {products} = useSelector((state)=> state.cart)

  useEffect(()=>{
    const fetchFoodDetails = async()=>{
      const res = await fetch(`https://order-create-food-backend.onrender.com/product/find/${id}`,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
    })
      const data = await res.json()
      console.log(data)
      setFoodDetails(data)
    }

    fetchFoodDetails()
  },[id,token])

  const changeQuantity = (command) =>{
       if(command === 'dec'){
          if(quantity === 1) return setQuantity(prev => prev - 1)
       }else if(command === 'inc'){
           setQuantity(prev => prev + 1)
       }
  }

  const addToCart = ()=>{
    dispatch(addProduct ({...foodDetails,quantity}))
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`https://order-create-food-backend.onrender.com/images/${foodDetails?.img}`} alt=''/>
        </div>
        <div className={classes.right}>
          <h2 className={classes.title}>{foodDetails?.title}</h2>
          <div className={classes.price}>
            price:<span>$</span> {foodDetails?.price}
          </div>
          <div className={classes.quantity}>
            <button disabled={quantity === 1} onClick={() => changeQuantity('dec')}>-</button>
            <span className={classes.quantityNumber}>{quantity}</span>
            <button onClick={()=> changeQuantity('inc')}>+</button>
          </div>
          <div className={classes.category}>
             <h3>Category: </h3>
             <span className={classes.categoryName}>{foodDetails?.category}</span>
          </div>
          <div className={classes.productDesc}>
             <div>Description: </div>
             <p>
              {foodDetails?.desc?.length > 50 ? `${foodDetails?.desc}`.slice(0,50): foodDetails?.desc }
             </p>
          </div>
          <button onClick={addToCart} className={classes.addToCart}>Add To Cart <AiOutlineShoppingCart/> </button>
        </div>
      </div>
    </div>
  )
}

export default FoodDetails