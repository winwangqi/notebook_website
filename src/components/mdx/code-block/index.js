import React from 'react'
import PropTypes from 'prop-types'
// import theme from 'prism-react-renderer/themes/dracula'
import Copy from './copy'
import normalize from './normalize'
import LazyHighlight from '../../lazy-highlight'

import './index.scss'
import cns from 'classnames'
import * as styl from './index.module.scss'

const getParams = (name = ``) => {
  const [lang, params = ``] = name.split(`:`)
  return [
    lang
      .split(`language-`)
      .pop()
      .split(`{`)
      .shift()
      ?.toLowerCase(),
  ].concat(
    params.split(`&`).reduce((merged, param) => {
      const [key, value] = param.split(`=`)
      merged[key] = value
      return merged
    }, {}),
  )
}

/*
 * MDX passes the code block as JSX
 * we un-wind it a bit to get the string content
 * but keep it extensible so it can be used with just children (string) and className
 */
const CodeBlock = (props) => {
  const {
    children,
    className = children.props ? children.props.className : ``,
    copy,
  } = props

  const [language, { title = `` }] = getParams(className)
  const [content, highlights] = normalize(
    children.props && children.props.children
      ? children.props.children
      : '',
    className,
  )

  return (
    <LazyHighlight code={content} language={language} theme={null}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <div className={cns('gatsby-highlight', 'gatsby-code-block', styl.codeBlock)}>
          {title && (
            <div className={cns('gatsby-code-title', styl.title)}>
              <div>{title}</div>
            </div>
          )}

          <div className={styl.codeBlockWrapper}>
              <span className={styl.lineNumber}>
              {[...Array(tokens.length)].map((v, i) => <span key={i}/>)}
            </span>

            <div className={styl.preWrapper}>
              <pre className={cns(`language-${language}`, styl.pre)}>
                <code className={cns(`language-${language}`, styl.code)}>
                  {tokens.map((line, i) => {
                    const lineProps = getLineProps({ line, key: i })
                    const className = [lineProps.className]
                      .concat(highlights[i] && `gatsby-highlight-code-line`)
                      .filter(Boolean)
                      .join(` `)

                    return (
                      <div
                        key={i}
                        {...Object.assign({}, lineProps, {
                          className,
                        })}
                      >
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    )
                  })}
                </code>

                {copy && (
                  <Copy
                    fileName={title}
                    content={content}
                    className={styl.copyButton}
                  />
                )}
              </pre>
            </div>
          </div>
        </div>
      )}
    </LazyHighlight>
  )
}

CodeBlock.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
  copy: PropTypes.bool,
}

CodeBlock.defaultProps = {
  copy: true,
}

export default CodeBlock
