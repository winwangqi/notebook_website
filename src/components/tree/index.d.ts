import * as React from 'react'

interface Node {
  id: string
  label: string
  context: any
  children?: Node[]
}

export interface Props {
  node: Node
  context: object
  activeID: string | number
  nodeCreator?: (node: Node) => React.ReactNode,
  treeClassName: string
  nodeClassName: string
}

declare class Tree extends React.Component<Props> {
}
