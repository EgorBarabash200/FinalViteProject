import React from 'react'
import { Button, Input, Space } from 'antd';
import "./searchInput.scss"
const SearchInput = () => {
    return (
        <div className="searchMainDiv">
            <div className="searchDiv">
                <div className="searchSmallDiv">Везде</div>
            </div>
            <Input className="searchInput" defaultValue="Искать товар" />
            <Button className="searchBtn" type="primary">Поиск</Button>
        </div>
    )
}

export default SearchInput
