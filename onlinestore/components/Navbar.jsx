import { SearchContext } from "@/app/hooks/SearchContext"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const Navbar = ({title, classname}) => {
  const {searchQuery, setSearchQuery,data, setFilteredData} = useContext(SearchContext)
  const router = useRouter()

  const handleSearch = (e) =>{
    e.preventDefault()
    const filteredProducts = data.filter(
      (product)=> product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredData(filteredProducts)
    router.push({
      pathname: '/search/SearchResutls',
      query: {searchQuery},
    })
  }

  return (
    <nav className='flex justify-between padding'>
      <Link href='/' className="text-xl font-bold">{title}</Link>
      <form onSubmit={handleSearch}>
        <label htmlFor="search"></label>
        <input 
          type="text" 
          name="search" 
          id="search" 
          placeholder="search for items..."
          className={classname}
          value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value)}/>
        <button type="submit" className= {`${classname} bg-slate-300 px-5 py-1 rounded-md`}>Search</button>
      </form>
    </nav>
  )
}

export default Navbar