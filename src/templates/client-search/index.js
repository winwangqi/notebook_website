import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import { throttle } from 'lodash'
import SearchWorker from './search.worker'
import { getInitSearchEngineAction, getSearchAction } from './search.worker.actions'


const SearchTemplate = props => {
  const { pageContext } = props
  const { allPageData } = pageContext
  const [result, setResult] = useState([])
  const searchWorker = useRef(new SearchWorker())

  useEffect(() => {
    searchWorker.current.postMessage(getInitSearchEngineAction(allPageData))

    searchWorker.current.addEventListener('message', e => {
      setResult(e.data)
    })
  }, [])

  const throttledHandleInputChange = throttle(function(keyword) {
    searchWorker.current.postMessage(getSearchAction(keyword))
  }, 80)

  const handleInputChange = function (e) {
    e.persist()
    throttledHandleInputChange(e.target.value)
  }

  return (
    <div>
      <h1 className={styl.header}>搜索 🔍</h1>
      <div>
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="请输入关键词"
        />
        <ul>
          {result.length > 0
            ? result.map(v =>
              (<li
                key={v.path}
              >
                <Link to={v.path}>{v.path}</Link>
              </li>)
            )
            : <div>no result</div>}
        </ul>
      </div>
    </div>
  )
}

export default SearchTemplate
