
/////////////////////////////////////////////////////////////
///returns an array of all the values of a given tree
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
////////////returns an array from checked nodes
function breadthFirstArray(root){
  let queue = [root];
  let checkedNodesVals = [];
  while(queue.length){
    let node = queue.shift();

    checkedNodesVals.push(node.val);

    if(node.left) queue.push(node.left);
    if(node.right) queue.push(node.right);
  }
  return checkedNodesVals;
}

breadthFirstArray(a)

////////////////////////////////////////////////////////////////////////////////
