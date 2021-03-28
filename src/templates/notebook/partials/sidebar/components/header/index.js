import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import TreeButtonGroup from './components/tree-button-group'
import SearchInput from './components/search-input'

import cns from 'classnames'
import * as styl from './index.module.scss'

Index.propTypes = {
  onToggleExpand: PropTypes.func,
  onLocateCurrent: PropTypes.func,
  onSearchInputChange: PropTypes.func,
  onSearchStatusChange: PropTypes.func,
}

Index.defaultProps = {
  onToggleExpand: Function.prototype,
  onLocateCurrent: Function.prototype,
  onSearchInputChange: Function.prototype,
  onSearchStatusChange: Function.prototype,
}

function Index(props) {
  const {
    onToggleExpand,
    onLocateCurrent,
    onSearchInputChange,
    onSearchStatusChange,
  } = props

  const [searchIsOpen, setSearchIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    onSearchStatusChange(searchIsOpen)
  }, [searchIsOpen])

  function handleOpenSearch() {
    setSearchIsOpen(true)
  }

  function handleCloseSearch() {
    handleSearchInputClear()
    setSearchIsOpen(false)
  }

  function handleSearchInputChange({ target: { value } }) {
    setInputValue(value)
    onSearchInputChange(value)
  }

  function handleSearchInputClear() {
    const value = ''
    setInputValue(value)
    onSearchInputChange(value)
  }

  return (
    <div className={styl.header}>
      <div className={cns(styl.wrapper, { [styl.searchIsOpen]: searchIsOpen })}>
        <div className={styl.item}>
          <TreeButtonGroup
            onToggleExpand={onToggleExpand}
            onLocateCurrent={onLocateCurrent}
            onSearch={handleOpenSearch}
          />
        </div>

        <div className={cns(styl.item, styl.searchInput)}>
          <SearchInput
            value={inputValue}
            onChange={handleSearchInputChange}
            onClear={handleSearchInputClear}
          />
          <i
            className={cns('iconfont icon-return', styl.icon)}
            onClick={handleCloseSearch}
          />
        </div>
      </div>
    </div>
  )
}

export default Index
