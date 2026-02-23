import { useState, UseEffect, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState(0);
  const [page, setPage] = useState(1)

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?Limit100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products)
    }
  };

  // console.log(products)

  useEffect(() => {
    fetchProducts()
  }, []);

  const selectedPageHandler = (selectedPage) => {
    if (selectedPage > 0 && selectedPage <= products.length && selectedPage !== page) {
      setPage(selectedPage)
    }
  }

  return (
    <>
      {
          products.length > 0 && <div className='products'>
            {
              products.slice(page * 10 - 10, page * 10).map((prod) => {
                return <span className='product__single' key ={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title} />
                  <span>{[prod.title]}</span>
                </span>;
              })
            }
          </div>
        }
        {
          products.length > 0 && <div className='pagination'>
            <span onClick={()=>selectedPageHandler(page - 1)}
              className={page !== 1 ? "" : "pagination__disable"}>Previous</span>
            {
              [...Array(products.length / 10)].map((_,i) => {
                return <span onClick={()=>selectedPageHandler(i + 1)} 
                key={i} 
                className={page === i + 1 ? "pagination__selected" : ""}>
                  {i+1}
                </span>
              })
            }
            <span onClick={()=>selectedPageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "pagination__disable"}>Next</span>
          </div>
        }
    </>
  )
}

export default App
