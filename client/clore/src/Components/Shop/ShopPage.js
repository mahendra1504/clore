import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


const Home = () => {

  const [list, setList] = useState([])

  const getData = async () => {

    const res = await fetch("http://localhost:1337/api/getproduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const productData = await res.json();
    if (res.status === 422 || !productData) {
      console.log("error");
    } else {
      
      setList(productData)

    }
  }
  
  useEffect(() => {
    getData()
    
  }, [])
  


  return (
    <div>
      {
        list.length>0?

        list.map((item) => {
          return (
            <div>
              name :{item.product_name} || 
              selling_price :{item.price} ||
              description :{item.short_desc} ||
              description :{item.long_desc} ||
              product_category : {item.category_id?.category_name} ||
              product_brand : {item.brand_id?.brand_name} ||
              product_brand : {item.sub_category_id?.sub_category_name} ||
              countInStock :{item.qty} ||
              Size :{item.size}  ||
              Color :{item.color} 
            </div>
            )
          })
          :
          ""
      }
      
    </div>
  )
}

export default Home