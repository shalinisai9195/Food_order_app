import React from 'react'
import classes from './create.module.css'
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { useState } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'



const Create = () => {
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [category,setCategory] = useState("")
  const [image,setImage] = useState("")
  const [price,setPrice] = useState("")
  const [review,setReview] = useState("")
  const navigate = useNavigate()

  const {token} = useSelector((state) => state.auth)

  const onChangeFile = (e) =>{
     setImage(e.target.files[0])
  }

  const handleClosedImg = ()=>{
     setImage('')
  }

const handleCreateProduct = async(e) =>{
   e.preventDefault()
   try {
    const formData = new FormData()

    let filename = null

    if(image){
      filename = Date.now() + image.name
      formData.append("filename", filename)
      formData.append("image" , image)

      await fetch(`https://order-create-food-backend.onrender.com/upload/image`,{
        headers:{
          "Authorization":`Bearer ${token}`
        },
        method:"POST",
        body: formData
      })
    }

   const res = await fetch(`https://order-create-food-backend.onrender.com/product`,{
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      method:'POST',
      body:JSON.stringify({
        title,
        desc,
        category,
        img: filename,
        price,
        review
      })
   })

   const food = await res.json()
    
    navigate(`/food/${food._id}`)
    
   } catch (error) {
     console.log(error.message)
   }
}

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Create food</h2>
        <form onSubmit={handleCreateProduct} encType="multipart/form-data">
           <div className={classes.inputWrapper}>
             <label>Title</label>
             <input type="text" placeholder="Title.." className={classes.input} onChange={(e)=> setTitle(e.target.value)}/>
           </div>
           <div className={classes.inputWrapper}>
             <label>Description</label>
             <input type="text" placeholder="description.." className={classes.input} onChange={(e)=> setDesc(e.target.value)}/>
           </div>
           <div className={classes.inputWrapper}>
             <label>Category</label>
             <input type="text" placeholder="Category.." className={classes.input} onChange={(e)=> setCategory(e.target.value)}/>
           </div>
           <div className={classes.inputWrapperImage}>
             <label htmlFor="image" className={classes.labelFileInput}>Image: <span>Upload here</span></label>
              <input type="file" 
               id="image"
               placeholder="image.." 
               className={classes.input} 
               onChange={onChangeFile}
               style={{display: 'none'}}
               />
               {image && <p className={classes.imageName}>{image.name} <AiOutlineCloseCircle onClick={handleClosedImg} className={classes.closeIcon}/></p>}
             </div>
           <div className={classes.inputWrapper}>
             <label>Price</label>
             <input type="number" step={0.01} placeholder="Price.." className={classes.input} onChange={(e)=> setPrice(e.target.value)}/>
           </div>
           <div className={classes.inputWrapper}>
             <label>Review</label>
             <input type="number" step={0.1} min={1} max={5} placeholder="Review.." 
             className={classes.input} onChange={(e)=> setReview(e.target.value)}/>
           </div>
           <div className={classes.buttonWrapper}>
             <button type='submit' className={classes.submitBtn}>
              Submit
             </button>
           </div>
        </form>
      </div>
    </div>
  )
}

export default Create