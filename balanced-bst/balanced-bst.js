const dataExample = [
    1, 2, 7, 4, 23, 20, 67, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
];
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

class Node {
    constructor(d) {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        const cleanSorted = [...new Set(array.sort((a, b) => a - b))]; // Sort array, turn it to set, and turn it back to array
        this.root = this.createTree(cleanSorted, 0, cleanSorted.length - 1);
    }

    createTree(array, start = 0, end = array.length - 1) {
        if (start > end) return null;

        const middle = parseInt((start + end) / 2);
        const node = new Node(array[middle]);
        node.left = this.createTree(array, start, middle - 1);
        node.right = this.createTree(array, middle + 1, end);

        return node;
    }

    insert(value) {
        // Empty tree
        if (this.root === null) {
            this.root = new Node(value);
            return;
        }

        // Note: duplicate will be ignored

        let currentNode = this.root;
        while (currentNode !== null) {
            if (value < currentNode.data) {
                // Left subtree

                if (currentNode.left === null) {
                    currentNode.left = new Node(value);
                    return this.root;
                }

                currentNode = currentNode.left;
            } else if (value > currentNode.data) {
                if (currentNode.right === null) {
                    // Right subtree

                    currentNode.right = new Node(value);
                    return this.root;
                }

                currentNode = currentNode.right;
            }
        }
    }

    deleteItem(value) {
        this.root = this._deleteRec(value, this.root);
    }

    _deleteRec(value, node) {
        if (node === null) return node;

        if (value < node.data) {
            node.left = this._deleteRec(value, node.left);
        } else if (value > node.data) {
            node.right = this._deleteRec(value, node.right);
        } else {
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }

            node.data = this._minValue(node.right);
            node.right = this._deleteRec(node.data, node.right);
        }
        return node;
    }

    _minValue(node) {
        let minv = node.data;
        while (node.left !== null) {
            minv = node.left.data;
            node = node.left;
        }
        return minv;
    }
    // ==== end of delete function ==== \\

    find(value, currentNode = this.root) {
        if (currentNode === null) return null;
        if (value === currentNode.data) return currentNode;

        if (value < currentNode.data) {
            return this.find(value, currentNode.left);
        } else if (value > currentNode.data) {
            return this.find(value, currentNode.right);
        }
    }

    levelOrder(callback) {
        if (!this.root) return [];
        const queue = [this.root]; // Start with root
        const defaultResult = [];

        while (queue.length > 0) {
            const currentNode = queue.shift(); // Dequeue

            if (callback) {
                callback(currentNode.data);
            } else {
                defaultResult.push(currentNode.data);
            }

            if (currentNode.left) queue.push(currentNode.left); // Enqueue
            if (currentNode.right) queue.push(currentNode.right);
        }

        return callback ? [] : defaultResult; // Return undefined or array of values based on cb existence
    }

    inOrder(callback, node = this.root, defaultResult = []) {
        if (!node) return;

        this.inOrder(callback, node.left, defaultResult);
        callback ? callback(node.data) : defaultResult.push(node.data); // Execute callback when specified
        this.inOrder(callback, node.right, defaultResult);

        return defaultResult;
    }

    preOrder(callback, node = this.root, defaultResult = []) {
        if (!node) return;

        callback ? callback(node.data) : defaultResult.push(node.data);
        this.preOrder(callback, node.left, defaultResult);
        this.preOrder(callback, node.right, defaultResult);

        return defaultResult;
    }

    postOrder(callback, node = this.root, defaultResult = []) {
        if (!node) return;

        this.postOrder(callback, node.left, defaultResult);
        this.postOrder(callback, node.right, defaultResult);
        callback ? callback(node.data) : defaultResult.push(node.data);

        return defaultResult;
    }

    height(node) {
        // Counter started from argument child, i.e node = 0, node.child = 0 + 1
        let left = _goLeft(node);
        let right = _goRight(node);

        function _goLeft(currentNode, i = 0) {
            if (currentNode.left === null) return i;
            return _goLeft(currentNode.left, i + 1);
        }
        function _goRight(currentNode, i = 0) {
            if (currentNode.right === null) return i;
            return _goRight(currentNode.right, i + 1);
        }

        return left > right ? left : right;
    }

    depth(node, currNode = this.root, i = 0) {
        // Counter started from argument parent, i.e node = 0, parent of node = + 1
        if (currNode === node) return i;

        if (node.data < currNode.data) {
            return this.depth(node, currNode.left, i + 1);
        } else if (node.data > currNode.data) {
            return this.depth(node, currNode.right, i + 1);
        }
    }

    isBalanced() {
        const left = this.height(this.root.left);
        const right = this.height(this.root.right);

        if (left === right) return true;
        else if (left > right) {
            if (left - right <= 1) return true;
            else return false;
        } else {
            if (right - left <= 1) return true;
            else return false;
        }
    }

    reBalance() {
        const sorted = this.inOrder();
        this.root = this.createTree(sorted);
    }
}

// ======================== Test ========================= \\
const createRandomArr = (n) => {
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
};
const unBalance = (tree) => {
    tree.insert(250);
    tree.insert(350);
    tree.insert(450);
    tree.insert(550);
};

const test = new Tree(createRandomArr(20));
console.log(test.isBalanced()); // True

console.log(test.levelOrder());
console.log(test.preOrder());
console.log(test.inOrder());
console.log(test.postOrder());

unBalance(test);
console.log(test.isBalanced()); // false
test.reBalance();
console.log(test.isBalanced()); // true

console.log(test.levelOrder());
console.log(test.preOrder());
console.log(test.inOrder());
console.log(test.postOrder());
