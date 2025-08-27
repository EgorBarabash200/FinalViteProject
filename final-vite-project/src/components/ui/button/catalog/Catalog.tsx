import React from 'react'
import { Button} from 'antd';
import "./catalog.scss"

interface CatalogProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}
const Catalog: React.FC<CatalogProps> = ({ children, onClick, disabled }) => {
  return (
   <Button 
     className="catalogBtn" 
     type="primary" 
     onClick={onClick}
     disabled={disabled}
   >
     {children}
   </Button>
  )
}

export default Catalog
