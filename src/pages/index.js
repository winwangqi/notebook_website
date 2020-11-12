import React from "react"

class IndexPage extends React.PureComponent {
  componentDidMount() {
    if (window) {
      window.location.replace('/track/index.html')
    }
  }

  render() {
    return null
  }
}

export default IndexPage
