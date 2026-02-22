import { useState, UseEffect, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState(0);
  const [page, setPage] = useState(0)

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?Limit100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products)
    }
  };

  console.log(products)

  useEffect(() => {
    fetchProducts()
  }, []);

  return (
    <>
      {
          products.length > 0 && <div className='products'>
            {
              products.map((prod) => {
                return <span className='product__single' key ={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{[prod.title]}</span>
                </span>;
              })
            }
          </div>
        }
    </>
  )
}

export default App
