class Node {
  constructor(data) {
    this.left = null
    this.data = data
    this.right = null
  }
}

class AVLTree {
  constructor() {
    this.root = null
    this.size = 0
    this.stack = []
    this.outPut = []
  }

  insert(data) {
    this.root = this._insert(this.root, new Node(data))
  }

  _insert(node, newNode) {
    if (!node) {
      return newNode
    }
    if (newNode.data > node.data) { /** 节点在根节点的右子树上 */
      node.right = node.right ? this._insert(node.right, newNode) : newNode
      // 添加完节点后检测树的高度
      if (this._height(node.right) - this._height(node.left) > 1) {
        /** 在不平衡的状态下判断是RR旋转还是RL旋转 */
        if (this._height(node.right.right) - this._height(node.right.left) > 0) {
          /** 在右子树的右子树上，应当进行RR旋转 */
          node = this.RRRotation(node)
        } else {
          /** 在右子树的左子树上，应当进行RL旋转*/
          node = this.RLRotation(node)
        }
      }
    } else if (newNode.data < node.data) {
      node.left = node.left ? this._insert(node.left, newNode) : newNode
      if (this._height(node.left) - this._height(node.right) > 1) {
        if (this._height(node.left.left) - this._height(node.left.right) > 0) {
          /** LL旋转 */
          node = this.LLRotation(node)
        } else {
          /** LR旋转 */
          node = this.LRRotation(node)
        }
      }
    }

    return node
  }

  getHeight() {
    return this._height(this.root)
  }

  _height(node) {
    let MaxHeight = 0
    if (!node) {
      return 0
    } else {
      let leftheight = 1 + this._height(node.left)
      let rightHight = 1 + this._height(node.right)
      MaxHeight = Math.max(leftheight, rightHight)
    }
    return MaxHeight
  }

  RRRotation(node) {
    /**
     * 1. 破坏者是发现者的右子树的右子树上                  10 发现者                      15
     *    平衡方法：                                     /   \                         /   \
     *       将发现者的右节点作为根节点                  8     15           RR         10    20
     *       原根节点作为新的根节点的左子树                   /   \         ---->     /   \    \
     *       新的根节点原有的左子树作为新根节点的右子树       13    20                8     13   25
     *                                                           \
     *                                                            25 破坏者
     */

    let temp = node.right // 找到新的根节点
    node.right = null
    let oldNode = node
    if (temp.left) {
      // 如果新的根节点有左子树，将左子树作为原根节点的右子树
      oldNode.right = temp.left
      temp.left = null
    }
    temp.left = oldNode // 将原有的根节点作为新的根节点的左子树
    return temp
  }
  
  RLRotation(node) {
    /**
     *  破坏者是发现者的右子树的左子树上                        10                           12
     *    平衡方法：                                         /   \                        /   \
     *       将根节点的右子树的左节点作为新的根节点            8     15           RL       10    15
     *       将新的根节点的左子树作为原根节点的右子树               /  \         ---->    /     /  \
     *       将新节点的右子树作为原根节点的右子树的左子树          12    18               8     11  28
     *                                                        /
     *                                                       11
     */
    let temp = node.right
    let newRoot = temp.left
    node.right = newRoot.left
    temp.left = newRoot.right
    newRoot.left = node
    newRoot.right = temp
    return newRoot
  }

  LLRotation(node) {
    /**
     * 破坏者是发现者的左子树的左子树上                          10 发现者                     5
     *    平衡方法：                                         /   \                        /   \
     *       将发现者的左节点作为根节点                      5     15        LL            3    10
     *       原根节点作为新的根节点的右子树                 /  \             ---->        /    /   \
     *       新的根节点原有的右子树作为新根节点的左子树     3    8                        1    8     15
     *                                                  /
     *                                                 1  破坏者
     */
    let temp = node.left // 找出新的根节点
    node.left = null
    let oldNode = node
    if (temp.right) {
      // 如果新的根节点有右节点，将右子树作为原根节点的左子树
      oldNode.left = temp.right
      temp.right = null
    }
    temp.right = oldNode // 将原根节点作为新的根节点的右子树
    return temp
  }

  LRRotation(node) {
    /**
     *  破坏者是在发现者的左子树的右子树上                       10                           8
     *    平衡方法：                                         /   \                        /   \
     *       将原根节点的左子树的右节点作为新的根节点         5     15      LR              5    10
     *       将新的根节点的左子树作为原根节点左子树的右子树  /  \           ---->          /  \    \
     *       将新的根节点的右子树作为原根节点的左子树      3    8                        3    7    15
     *                                                      /
     *                                                     7
     */
    let temp = node.left
    let newRoot = temp.right
    temp.right = newRoot.left
    node.left = newRoot.right
    newRoot.left = temp
    newRoot.right = node
    return newRoot
  }

  // 层次遍历
  levelOrder() {
    this.outPut = []
    this.stack.push(this.root)
    while (this.stack.length) {
      let currentNode = this.stack.shift()
      this.outPut.push(currentNode.data)
      if (currentNode.left) {
        this.stack.push(currentNode.left)
      }
      if (currentNode.right) {
        this.stack.push(currentNode.right)
      }
    }
    return this.outPut
  }
}

let treeInstance = new AVLTree()

treeInstance.insert(10)
treeInstance.insert(8)
treeInstance.insert(15)
treeInstance.insert(12)
treeInstance.insert(28)
treeInstance.insert(11)
let ret = treeInstance.levelOrder()
console.log(ret)
// console.log(treeInstance.getHeight())
// console.log(JSON.stringify(treeInstance.root))
