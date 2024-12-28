import Link from 'next/link'

const SellersHomePage = ({ children }: { children: React.ReactNode }) => {
  console.log('SellersHomePage Rendered');
  return (
    <>
     <div> this is the SellersHomePage Navbar   <Link href={`/seller/pos/`}>pos</Link></div>
    
    
        <div>{children}</div>
        <div>footer</div>
    </>
   
    
  )
}

export default SellersHomePage