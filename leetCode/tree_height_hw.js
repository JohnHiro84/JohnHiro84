

////////////////////////////////////////////////////////// get height of a given tree

function treeHeight(root){
  let queue = [[root, 0]];
  let maxHeight = 0;
  if(root === null) return -1;
  if(root.left === null && root.right === null) return 0;
  while(queue.length){
    let node = queue.shift();
    let level = (node[1] +1);
    if(node[0].left) {
      queue.push([node[0].left, level]);
      maxHeight = Math.max(maxHeight, level);
    }
    if(node[0].right) {
      queue.push([node[0].left, level]);
      maxHeight = Math.max(maxHeight, level);
    }
  }
  return maxHeight;
}

function treeHeightRecur(root){
  if(!root) return -1;
  return 1 + Math.max(treeHeight(root.left),treeHeight(root.right));
}

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
a.left = b;
a.right = c;
b.left = d;
b.right = e;
treeHeight(a);

let w = new TreeNode('w');
let y = new TreeNode('y');
let x = new TreeNode('x');
let z = new TreeNode('z');
w.left = x;
x.left = y;
y.left = z;
treeHeight(w);
