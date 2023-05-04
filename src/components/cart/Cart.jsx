import React  from 'react'
import classes from './cart.module.css'
import {useSelector,useDispatch} from 'react-redux';
import {AiOutlineClose} from 'react-icons/ai'
import {useNavigate} from 'react-router-dom'
import {removeProduct} from '../../redux/cartSlice'

const Cart = () => {
  const {products} = useSelector((state) => state.cart)
  const dispatch = useDispatch('')
  const navigate = useNavigate();
  
  let totalprice =0
  products.map((product) => totalprice += (product.quantity * product.price))

  const handleRemoveProducts = (id)=> {
     dispatch(removeProduct({_id: id}))
  }

  const handleOrder = () =>{
     if(products.length > 0){
      navigate('/checkout')
     }
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
             {products.length > 0 ? products.map((product) => (
            <div key={product._id} className={classes.product}>
               <div className={classes.closeBtn} onClick={() => handleRemoveProducts(product._id)}><AiOutlineClose/></div>
                 <div className={classes.productData}>
                 <img src={`https://order-create-food-backend.onrender.com/images/${product.img}`} className={classes.img} alt=''/>
                    <h3 className={classes.title}>{product.title}</h3>
                 <div className={classes.productAndQuantity}>
                  <span className={classes.quantity}>{product.quantity} x </span>
                  <span className={classes.price}><span>$</span> {product.price} </span>
                </div>
               </div>
            </div>

           )):<h1 className={classes.noProducts}>No Products in the cart. Go Shopping...!</h1>}
        </div>
        <div className={classes.right}>
          <div className={classes.totalProductMsg}>Total Products: {products.length}</div>
          <div className={classes.subtotalCheckoutBtns}>
            <span className={classes.subtotal}>Subtotal: ${totalprice}</span>
            <span onClick={handleOrder} disabled={products.length === 0} className={classes.orderNowBtn}>
              Order now
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart