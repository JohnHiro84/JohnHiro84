
//sum all values of a given tree 
///////////////tree sum uses the below nodes, above problems use above nodes
class TreeNode {
  constructor(val){
    this.val = val;
    this.left = null;
    this.right = null;
  }
}
//example case
let a = new TreeNode(10);
let b = new TreeNode(-4);
let c = new TreeNode(3);
let d = new TreeNode(6);
let e = new TreeNode(2);
let f = new TreeNode(2);
a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

function treeSum(root){
  if(root === undefined) return 0;
  if(!root) return 0;
  let sum = 0;
  let queue = [root];
  while(queue.length){
    let node = queue.shift();
    sum+= node.val
    if(node.left) queue.push(node.left);
    if(node.right) queue.push(node.right);
  }
  return sum;
}

treeSum(a);
treeSum(d);
treeSum(null);
