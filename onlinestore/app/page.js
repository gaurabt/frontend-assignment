'use client'

import Product from "@/components/product"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { useContext } from "react"
import { SearchContext } from "./hooks/SearchContext"
import Navbar from "@/components/Navbar"

const Home = () => {

  const {data,isLoading,error} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get(
        'https://fakestoreapi.com/products'
      )
      const data = await res.data
      if(data){
        return data
      }
    }
  })

  const {searchQuery, setSearchQuery} = useContext(SearchContext)

  if(isLoading) return "Your content is Loading..."

  if(error) return "There was an error" + error.message

  // filter products based on the search query
  const filteredProducts = data.filter(
    product => product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if(data){  
    // Organize and sort the data based on categories (doesn't work)
      const organizedData = data ? data.reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(item)
        return acc
    }, {})
    : {}

    return(
      <section className='flex-col'>
        <div className="bg-black w-full flex flex-col justify-center items-center text-yellow-100 h-[45vh] sm:h-[55vh] mt-8">
          <h1 className='text-5xl'>OnlineStore</h1>
          <h2 className='text-xl'>Buy Everything you need</h2>
        </div>
        <section className="padding p-8"> 
          <h2 className="text-3xl mb-5">Discover Our Products</h2>
          <Navbar classname='my-5'/>
          {filteredProducts.length > 0 ? (
            // Render filtered products
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-8 mt-5">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Product
                    key={product.id}
                    id={product.id}
                    img={product.image}
                    title={product.title}
                    price={product.price}
                  />
                </Link>
              ))}
            </div>
          ) : (
            // Render organized products
            <>
              {Object.entries(organizedData).map(([category, categoryData]) => (
                <div key={category} className="py-5">
                  <h3 className="uppercase text-xl">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-8 mt-5">
                    {categoryData.map((product) => (
                      <Link key={product.id} href={`/products/${product.id}`}>
                        <Product
                          key={product.id}
                          id={product.id}
                          img={product.image}
                          title={product.title}
                          price={product.price}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
      </section>
    </section>
    )
  }
  return null
}

export default Home
