///uses depth first search to search for and return a target node

class TreeNode {
  constructor(val){
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

let a = new TreeNode('a');
let b = new TreeNode('b');
let c = new TreeNode('c');
let d = new TreeNode('d');
let e = new TreeNode('e');
let f = new TreeNode('f');
// let g = new TreeNode('g');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;
d.left = g;
//     a
//   b     c
// d  e      f
// g


// depth first uses a stack
function depthFirst(root, value){
  let stack = [root];
  while (stack.length){
    let node = stack.pop();
    if(node.val === value) return node;
    if(node.right) stack.push(node.right);
    if(node.left) stack.push(node.left);
  }
  return null;
}
depthFirst(a, "e");
depthFirst(a, "w");
