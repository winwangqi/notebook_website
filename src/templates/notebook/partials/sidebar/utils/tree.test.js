import { flattenTree, filterTree } from './tree'

describe('test tree', () => {
  const treeData = {
    id: 'root',
    type: 'root',
    children: [
      {
        id: '1',
        label: '1',
        children: [
          {
            id: '1-1',
            label: '1-1',
          },
          {
            id: '1-2',
            label: '1-2',
          },
        ],
      },
      {
        id: '2',
        label: '2',
        children: [
          {
            id: '2-1',
            label: '2-1',
            children: [
              {
                id: '2-1-1',
                label: '2-1-1',
              },
              {
                id: '2-1-2',
                label: '2-1-2',
              },
            ],
          },
        ],
      },
    ],
  }

  describe('test flattenTree', () => {
    it('should return correct result without chain', () => {
      const output = [
        {
          id: '1',
          label: '1',
        },
        {
          id: '1-1',
          label: '1-1',
        },
        {
          id: '1-2',
          label: '1-2',
        },
        {
          id: '2',
          label: '2',
        },
        {
          id: '2-1',
          label: '2-1',
        },
        {
          id: '2-1-1',
          label: '2-1-1',
        },
        {
          id: '2-1-2',
          label: '2-1-2',
        },
      ]

      expect(flattenTree(treeData)).toEqual(output)
    })

    it('should return correct result with chain', () => {
      const output = [
        {
          id: '1',
          label: '/1',
        },
        {
          id: '1-1',
          label: '/1/1-1',
        },
        {
          id: '1-2',
          label: '/1/1-2',
        },
        {
          id: '2',
          label: '/2',
        },
        {
          id: '2-1',
          label: '/2/2-1',
        },
        {
          id: '2-1-1',
          label: '/2/2-1/2-1-1',
        },
        {
          id: '2-1-2',
          label: '/2/2-1/2-1-2',
        },
      ]

      expect(flattenTree(treeData, true)).toEqual(output)
    })
  })

  describe('test filterTree', () => {
    it('should return correct result', () => {
      const inputTreeData = {
        ...treeData,
        children: [
          ...treeData.children,
          {
            id: '3',
            label: '3',
            children: [
              {
                id: '3-1',
                label: '3-1',
                children: [
                  {
                    id: '3-1-1',
                    label: '3-1-1',
                  },
                  {
                    id: '3-1-2',
                    label: '3-1-2',
                  }
                ]
              }
            ]
          }
        ]
      }
      const filterIDList = ['1-2', '2-1', '3-1', '3-1-2']

      const output = {
        id: 'root',
        type: 'root',
        children: [
          {
            id: '1',
            label: '1',
            children: [
              {
                id: '1-2',
                label: '1-2',
              },
            ],
          },
          {
            id: '2',
            label: '2',
            children: [
              {
                id: '2-1',
                label: '2-1',
                children: [
                  {
                    id: '2-1-1',
                    label: '2-1-1',
                  },
                  {
                    id: '2-1-2',
                    label: '2-1-2',
                  },
                ],
              },
            ],
          },
          {
            id: '3',
            label: '3',
            children: [
              {
                id: '3-1',
                label: '3-1',
                children: [
                  {
                    id: '3-1-1',
                    label: '3-1-1',
                  },
                  {
                    id: '3-1-2',
                    label: '3-1-2',
                  }
                ]
              }
            ]
          }
        ],
      }

      expect(filterTree(inputTreeData, filterIDList)).toEqual(output)
    })
  })
})
