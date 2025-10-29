import React from 'react'
import Catalog from '../ui/button/catalog/Catalog'
import SearchInput from '../ui/input/searchInput/SearchInput'
import "./header.scss"
import type { HeaderProps } from '../../interface/interface'

const Header: React.FC<HeaderProps> = ({ openModal, user }) => {
    return (
        <div className="headerDiv">
            <Catalog>Каталог</Catalog>
            <SearchInput></SearchInput>
            <div className="headerOpenSvg" onClick={openModal}></div>
            <div className="headerBasketSvg"></div>
            <div className="mobile">
                <div className="mobileOpen" onClick={openModal}>👤</div>
                <div className="mobileBasket">🛒</div>
            </div>
            <div> {user?.login}</div>
        </div>
    )
}

export default Header
