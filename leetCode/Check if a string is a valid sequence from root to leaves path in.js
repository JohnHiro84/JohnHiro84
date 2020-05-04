//LeetCode 30 day challange April 30th

// Check if a string is a valid sequence 
// from root to leaves path in
// a binary tree
//
//
// ex1
//
//           *0
//       *1        0
//   *0     1
//    *1   0 0
// arr input is [0,1,0,1]
// output: true;
// there is a path
//
//
//   ex2
//           0*
//       1       0*
//   0    1    0
//    1  0 0
//    arr input is [0,0]
//    output: false;
//
//    ex3
//           *0
//         *1      0
//     0     *1      0
//      1   0  0

//   arr = [0,1,1]
//   output: false


  class TreeNode {
    constructor(val){
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  let a = new TreeNode(0);
  let b = new TreeNode(1);
  let c = new TreeNode(0);
  let d = new TreeNode(0);
  let e = new TreeNode(1);
  let f = new TreeNode(0);
  let g = new TreeNode(1);
  let h = new TreeNode(0);
  let i = new TreeNode(0);

  a.left = b;
  a.right = c;

  b.left = d;
  b.right = e;

  c.left = f;

  d.right = g;
  e.left = h;
  e.right = i;


  //depth first uses a stack
  function depthFirst(root, array){
    let arr_str = array.join('');

    let stack = [ [root , ""]];

    while (stack.length){
      let node = stack.pop();
      let own_str = node[1].toString() + node[0].val.toString();
      // console.log(own_str);
      if(own_str === arr_str && node[0].left === null && node[0].right === null){
        return true;

      }
      if(node[0].right) stack.push([node[0].right, own_str]);
      if(node[0].left) stack.push([node[0].left, own_str]);
    }
    return false;
  }

depthFirst(a, [0,1,0,1])
depthFirst(a, [0,1,1])
depthFirst(a, [0,0])


