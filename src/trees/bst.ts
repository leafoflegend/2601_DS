class TreeNode {
    value: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;

    constructor(value: number) {
        this.value = value;
    };

    insert = (value: number): TreeNode => {
        if (value > this.value) {
            if (!this.right) {
                const newNode = new TreeNode(value);
                this.right = newNode;

                return newNode;
            } else {
                return this.right.insert(value);
            }
        }

        if (value < this.value) {
            if (!this.left) {
                const newNode = new TreeNode(value);
                this.left = newNode;

                return newNode;
            } else {
                return this.left.insert(value);
            }
        }

        return this;
    };
}

// Balanced Tree
const tree = new TreeNode(5);
tree.insert(3);
tree.insert(7);
tree.insert(9);
tree.insert(6);
tree.insert(2);
/*
      5
   3     7
2      6   9
*/

// Unbalanced Tree
const unbalancedTree = new TreeNode(10);
unbalancedTree.insert(5);
unbalancedTree.insert(15);
unbalancedTree.insert(3);
unbalancedTree.insert(1);
unbalancedTree.insert(7);
/*
                   10
              5           15
          3       7
      1
*/

const breadthFirstSearch = (node: TreeNode, cb: (node: TreeNode) => void) => {
    const queue = [node];

    while (queue.length) {
        const currentNode = queue.shift() as TreeNode;

        cb(currentNode);

        if (currentNode.left) {
            queue.push(currentNode.left);
        }

        if (currentNode.right) {
            queue.push(currentNode.right);
        }
    }
};

// breadthFirstSearch(tree, (n) => console.log(n.value));

const depthFirstSearch = (
    searchType: 'in' | 'pre' | 'post',
    node: TreeNode | null,
    cb: (node: TreeNode) => void,
) => {
    if (!node) {
        return ;
    }

    if (searchType === 'pre') {
        cb(node);
    }

    depthFirstSearch(searchType, node.left, cb)

    if (searchType === 'in') {
        cb(node);
    }

    depthFirstSearch(searchType, node.right, cb);

    if (searchType === 'post') {
        cb(node);
    }
};

// depthFirstSearch('post', tree, (n) => console.log(n.value));


const isBalanced = (node: TreeNode): boolean => {
    const findDepth = (depthNode: TreeNode | null, depth: number = 0): number => {
        if (!depthNode) {
            return depth;
        }

        const leftDepth = findDepth(depthNode.left, depth + 1);
        const rightDepth = findDepth(depthNode.right, depth + 1);

        return leftDepth >= rightDepth ? leftDepth : rightDepth;
    };

    const leftDepth = findDepth(node.left);
    const rightDepth = findDepth(node.right);

    return Math.abs(leftDepth - rightDepth) <= 1;
};

console.log('Balanced True: ', isBalanced(tree));
console.log('Balanced False: ', isBalanced(unbalancedTree));