import React from 'react'
import ProductsTable from './products-table'

const SellersProducts = () => {
  return (
   <>
    <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
        <div style={{flexGrow:8}}>
                <ProductsTable/>
        </div>
        <div style={{flexGrow:4, backgroundColor:'red'}}>
                del martinini
        </div>


    </div>
   
   </>
  )
}

export default SellersProducts