import React from 'react'
import classes from './checkout.module.css'
import {useSelector} from 'react-redux'

const Checkout = () => {

const{products} = useSelector((state) => state.cart)

let totalPrice =0
products.map((product) => totalPrice += (product.quantity * product.price))

return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Your Order is Successful</h2>
        <p>Expect it in 1 hour</p>
        <span>Total Price:${totalPrice}</span>
      </div>
    </div>
  )
}

export default Checkout