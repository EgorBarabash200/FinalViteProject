import React from 'react'
import { Button, Input, Space } from 'antd';
import cl from './SearchInput.module.css'
const SearchInput = () => {
    return (
        <div className={cl.searchMainDiv}>
            <div className={cl.searchDiv}>
                <div className={cl.searchSmallDiv}>Везде</div>
            </div>
            <Input className={cl.searchInput} defaultValue="Искать товар" />
            <Button className={cl.searchBtn} type="primary">Поиск</Button>
        </div>
    )
}

export default SearchInput
