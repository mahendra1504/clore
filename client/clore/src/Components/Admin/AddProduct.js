import React, { useState, useEffect } from 'react';

const AddProduct = () => {
  const [list, setList] = useState([])
  const [list1, setList1] = useState([])
  const [list2, setList2] = useState([])
  const [pname,setPname] = useState("")
  const [price,setPrice] = useState("")
  const [color,setColor] = useState("")
  const [size,setSize] = useState("")
  const [small_desc,setSmallDesc] = useState("")
  const [long_desc,setLongDesc] = useState("")
  const [qty,setQty] = useState("")
  const [brand_id,setBrand] = useState("")
  const [category_id,setCategory] = useState("")
  const [sub_category_id,setSubCategory] = useState("")

  const getBrand = async () => {

        const res = await fetch("http://localhost:1337/api/getbrand", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const brandData = await res.json()
        if (res.status === 422 || !brandData) {
            console.log("error");
        } else {
            setList(brandData)

        }
    }

    const getCategory = async () => {
        const res = await fetch("http://localhost:1337/api/getcategory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const categoryData = await res.json()
        if (res.status === 422 || !categoryData) {
            console.log("error")
        } else {
            setList1(categoryData)
            //console.log(data);
        }
    }

    const getSubCategory = async () => {
        const res = await fetch("http://localhost:1337/api/getsubcategory", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const subcategoryData = await res.json()
        if (res.status === 422 || !subcategoryData) {
            console.log("error")
        } else {
            setList2(subcategoryData)
            //console.log(data);
        }
    }


    useEffect(() => {
        getBrand()
        getCategory()
        getSubCategory()
    }, [])


  const addUserdata  = async (e) =>{
    e.preventDefault();
    console.log(pname);
    console.log(price);
    console.log(color);
    console.log(size);
    console.log(qty);
    console.log(small_desc);
    console.log(long_desc);
    console.log(category_id);
    console.log(sub_category_id);
    console.log(brand_id);

    if(pname===''){
      alert("Enter Name")
    }else if (price ===''){
      alert("Enter Email")
    }else if(color===''){
      alert("Enter Valid Email")
    }else if(qty===''){
      alert("Enter your password")
    }else if(size===''){
      alert("Size")
    }else if(small_desc===''){
      alert("small_desc")
    }else if(long_desc===''){
      alert("long_desc")
    }else{     
      const data = await fetch("http://localhost:1337/api/addproduct", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pname,
            price,
            color,
            size,
            qty,
            small_desc,
            long_desc,
            category_id,
            brand_id,
            sub_category_id,
        })
    });

    const res = await data.json();
    console.log(res.status);

    if(res.status === 'ok'){
      alert("Product Added Successfully");
      
    }
  


    }
  }
  return (
    <>
    <section>
      <div className='form_data'>
        <div className='form_heading'>
          <h1>Add Product</h1>
          
        </div>
        <form>
          <div className='form_input'>
            <label htmlFor='pname'>Enter Product Name</label>
            <input type="text"
             onChange={(e) => setPname(e.target.value)}
            value={pname} 
            name="pname" 
            placeholder='Enter Product Name Here' />
          </div>
          
          <div className='form_input'>
            <label htmlFor='price'>Price</label>
            <input type="number"
             onChange={(e) => setPrice(e.target.value)}
            value={price} 
            name="price" 
            placeholder='Enter Product Price Here' />
          </div>

          <div class="form-group">
            <label for="exampleInputUsername1">Product Category</label>
               <select value={category_id} onChange={(e) => setCategory(e.target.value)} selected name='category_id' class="form-control">
                  {
                    list1.map((item, index) => {
                      return (
                          <>
                            <option value={item._id}>{item.category_name}</option>
                          </>
                      )
                    })
                  }     
                </select>
          </div>

          <div class="form-group">
            <label for="exampleInputUsername1">Product Brand</label>
               <select value={brand_id} onChange={(e) => setBrand(e.target.value)} selected name='brand_id' class="form-control">
                  {
                    list.map((item, index) => {
                      return (
                          <>
                            <option value={item._id}>{item.brand_name}</option>
                          </>
                      )
                    })
                  }     
                </select>
          </div>

          <div class="form-group">
            <label for="exampleInputUsername1">Product Category</label>
               <select value={sub_category_id} onChange={(e) => setSubCategory(e.target.value)} selected name='sub_category_id' class="form-control">
                  {
                    list2.map((item, index) => {
                      return (
                          <>
                            <option value={item._id}>{item.sub_category_name}</option>
                          </>
                      )
                    })
                  }     
                </select>
          </div>


          <div className='form_input'>
            <label htmlFor='small_desc'>Small Description</label>
            <input type="text" 
            onChange={(e) => setSmallDesc(e.target.value)}
            value={small_desc}
            name="small_desc" 
            placeholder='Enter Small Description for Product' />
          </div>

          <div className='form_input'>
            <label htmlFor='long_desc'>Long Description</label>
            <input type="text"
             onChange={(e) => setLongDesc(e.target.value)}
            value={long_desc} 
            name="long_desc" 
            placeholder='Enter Long Description for Product' />
          </div>

          <div className='form_input'>
            <label htmlFor='images'>Product Images</label>
            <div className='two'>
              <input 
              type="file"
              name="images"
              placeholder='Select Product Images' />       
            </div>
          </div>

         <div className='form_input'>
            <label htmlFor='color'>Product Color</label>
            <input type="text" 
            onChange={(e) => setColor(e.target.value)}
            value={color}
            name="color" 
            placeholder='Enter Product Color' />
          </div>

          <div className='form_input'>
            <label htmlFor='size'>Product Size</label>
            <input type="text" 
            onChange={(e) => setSize(e.target.value)}
            value={size}
            name="size" 
            placeholder='Enter Product Size' />
          </div>


          <div className='form_input'>
            <label htmlFor='qty'>Product In Stock</label>
            <input type="number" 
            onChange={(e) => setQty(e.target.value)}
            value={qty}
            name="qty" 
            placeholder='Enter Number of Products in Stocks' />
          </div>

          <button className='btn' onClick={addUserdata}>Add Product</button>
        </form>
      </div>
    </section>
    </>
  )
}

export default AddProduct