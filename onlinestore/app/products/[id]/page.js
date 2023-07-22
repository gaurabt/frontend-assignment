'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Page = ({params}) => {
  const router = useRouter()
  const {id} = params

  const {data,isLoading,error} = useQuery({
      queryKey: ['product'],
      queryFn: async () => {
        const res = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        )
        const data = await res.data
        if(data){
          console.log(data)
          return data
        }
      }
    })
    
    if(data){
    return (
    <div className='flex my-14 mx-10 px-12 py-5 gap-10 border-2 min-w-[700px] max-w-[60vw] rounded-md shadow-xl shadow-slate-300 hover:translate-y-[-5%] duration-200 transition-all'>
      <img src={data.image} alt={data.title} className='w-[200px]'/>
      <div className='flex flex-col gap-3'>
        <h2 className='text-[2rem] text-purple-400 border-b-2 border-purple-400'>{data.title}</h2>
        <p>{data.description}</p>
        <p className='font-bold text-gray-800 text-xl'>${data.price}</p>
        <p className={data.rating.rate < 3 ? 'text-red-500': 'text-green-500'}><span className='font-bold text-black'>Rating:</span> {data.rating.rate}</p>
      </div>
    </div>
  )
}
}

export default Page