import * as React from 'react'

interface Node {
  id: string
  label: string
  context: any
  children?: Node[]
}

export interface Props {
  node: Node
  nodeCreator?: (node: Node) => React.ReactNode
}

declare class Tree extends React.Component<Props> {
}
