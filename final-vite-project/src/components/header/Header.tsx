import React from 'react'
import Catalog from '../ui/button/catalog/Catalog'
import SearchInput from '../ui/input/searchInput/SearchInput'
import cl from './Header.module.css'
const Header = () => {
    return (
        <div className={cl.headerDiv}>
            <Catalog></Catalog>
            <SearchInput></SearchInput>
            <div className={cl.headerOpenSvg}></div>
            <div className={cl.headerBasketSvg}></div>
        </div>
    )
}

export default Header
