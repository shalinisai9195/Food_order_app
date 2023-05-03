import React, { useState } from 'react'
import classes from './navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineUser,AiOutlineShoppingCart} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../redux/authSlice';

const Navbar = () => {
  const [isScrolled,setScrolled] = useState(false)
  const {products} = useSelector((state)=> state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  window.onscroll = () =>{
     setScrolled(window.pageYOffset === 0 ? false : true)
     return () => (window.onscroll = null)
}  

const handleLogout = ()=>{
  dispatch(logout())
  navigate('/login')
}

return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to='/' className={classes.title}>
              Happy-Healthy-life
          </Link>
        </div>
        <div className={classes.center}>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <a href='javascript(void)'>Home</a>
            </li>
            <li className={classes.listItem}>
              <a href='#contacts'>Contacts</a>
            </li>
            <li className={classes.listItem}>
              <a href='#foods'>Foods</a>
            </li>
            <li className={classes.listItem}>
              <a href='#faq'>FAQ</a>
            </li>
            <li className={classes.listItem}>
              <Link to='/create'>Create</Link>
            </li>
          </ul>
        </div>
        <div className={classes.right}>
            <AiOutlineUser className={classes.userIcon}/>
            <Link to='/cart' className={classes.cartContainer}>
               <AiOutlineShoppingCart className={classes.cartIcon}/>
               <div className={classes.cartQuantity}>{products.length}</div>
            </Link>
            <button onClick={handleLogout} className={classes.logout}>Logout</button>

        </div>


      </div>
       
      
    </div>
  )
}

export default Navbar