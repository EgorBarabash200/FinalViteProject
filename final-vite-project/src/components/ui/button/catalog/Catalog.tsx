import React from 'react'
import { Button} from 'antd';
import  cl from'./Catalog.module.css'
const Catalog = () => {
  return (
   <Button className={cl.catalogBtn} type="primary">Каталог</Button>
  )
}

export default Catalog
