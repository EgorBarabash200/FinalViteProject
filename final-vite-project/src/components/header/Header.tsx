import React from 'react'
import Catalog from '../ui/button/catalog/Catalog'
import SearchInput from '../ui/input/searchInput/SearchInput'
import "./header.scss"
const Header = () => {
    return (
        <div className="headerDiv">
            <Catalog></Catalog>
            <SearchInput></SearchInput>
            <div className="headerOpenSvg"></div>
            <div className="headerBasketSvg"></div>
            <div className="mobile">
                <div className="mobileOpen">👤</div>
                <div className="mobileBasket">🛒</div>
            </div>
        </div>
    )
}

export default Header
