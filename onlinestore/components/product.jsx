
const Product = ({id,img, title, price}) => {
  return (
    <article className='flex flex-col bg-slate-400 min-w-[220px] w-[240px] items-center pb-4 rounded-lg overflow-hidden'>
      <img src={img} alt={title} className="max-w-full w-full h-[240px]"/>
      <p className="overflow-initial whitespace-initial">{title}</p>
      <p>${price}</p>
    </article>
  )
}

export default Product