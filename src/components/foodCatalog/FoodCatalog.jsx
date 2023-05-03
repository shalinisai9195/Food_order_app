import React, { useEffect } from 'react'
import classes from './food.module.css';
import { useState} from 'react';
import {useSelector} from 'react-redux';
import {useLocation,Link} from 'react-router-dom';

const FoodCatalog = () => {
  const [filteredFoods,setFilteredFood] = useState([])
  const location = useLocation()
  const foodEndpoint = location.pathname.split('/')[2]
  const {token} = useSelector((state)=> state.auth)

  useEffect(()=>{
    const fetchFoodType = async () =>{
              const res = await fetch(`https://order-create-food-backend.onrender.com/product?category=${foodEndpoint}`,{
                headers:{
                  "Authorization":`Bearer ${token}`
                }
              })
              const data = await res.json()
              console.log(data)
             setFilteredFood(data)
    }
    fetchFoodType()
  },[foodEndpoint,token])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
       {filteredFoods?.length !== 0 && <h2 className={classes.title}>The best {foodEndpoint} in the region</h2>}
      </div>
      <div className={classes.foods}>
        {filteredFoods.length !==0 ? filteredFoods.map((f) => (
           <Link to={`/food/${f._id}`} key={f._id} className={classes.food}>
            <div className={classes.imgContainer}>
               <img src={`https://order-create-food-backend.onrender.com/images/${f?.img}`} className={classes.foodImg} alt=''/>
            </div> 
            <div className={classes.foodDetails}>
              <h4 className={classes.foodTitle}>{f?.title}</h4>
              <span className={classes.price}>$<span>{f?.price}</span></span>
            </div>  
          </Link>
           )): <h1 className={classes.noQuantity}>No {foodEndpoint} right now</h1> }
      </div>
    
    </div>
  )
}

export default FoodCatalog