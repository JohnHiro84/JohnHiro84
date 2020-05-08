682 BaseBall Game


you're given a list of strings

integer
"+" -	points you get this round, are sum of the last 2 valid round's points

"D"  the poitns you get in this round are doubled data of the lats valid rounds
 points

"C" represents the last valid round points, you get were invalid and should be
removed




ex1	5	2	c	d	+
rd1 	you could get 5 pts, sum is 5
rd2	you could get 2 pts, sum is 7
peration1: the round 2s data invalid sum is 5
rd3	you could get 10 pts (rd2 data has been removed), sum is 15
rd4	you  could get 5 + 10 = 15 pts, sum is 30


baseball([5,-2,4,"C", "D", 9, "+", "+"]);

ex2	5	-2	4	c	d	9	+	+

1	5 PTS
2	-2, 	= 3pts
3	+ 4	=7 pts
op1	(last -4 pts invalid)	3pts
3pts + (2 x -2) = -1pts
you could get 9pts	= 	8pts
+ (9pts + -4) = + 5pts = 13pts total
+9 + 5
27pts

size of input list b/w 1 and 1000
every integer b/w 30000 and 30000


--------------------------------------------


function baseball(array){

  let valid_rounds = [];

  for(i in array){

    if(typeof array[i] === 'number'){
      valid_rounds.push(parseInt(array[i]));

    } else if(array[i] === "D"){
      let last_valid = valid_rounds[valid_rounds.length -1];
      valid_rounds.push(last_valid * 2);

    } else if(array[i] === "+"){
      let last_valid1 = valid_rounds[valid_rounds.length -1];
      let last_valid2 = valid_rounds[valid_rounds.length -2];
      valid_rounds.push(last_valid1 + last_valid2);

    } else if(array[i] === "C"){
      valid_rounds.pop();

    }

  }
  const reducer = (accumulator, currentV) => accumulator + currentV;
  return valid_rounds.reduce(reducer);
}

baseball([5,-2,4,9, "D", "+", "+"]);
baseball([5,-2,4,"C", "D", 9, "+", "+"]);
baseball([5,2, "C", "D", "+"]);


maybe use a set?
can you iterate through a set? map?


//
// function baseball(ops){
//
//   let Y = [];
//
//   for(i in ops){
//     Z = ops.length;
//
//     if(ops[i] === "D"){
//       Y.push(Y[Z -1] * 2);
//
//     } else if(ops[i] === "+"){
//       Y.push(Y[Z -1] + Y[Z -2]);
//
//     } else if(ops[i] === "C"){
//       Y.pop();
//
//     } else{
//       Y.push(parseInt(ops[i]));
//     }
//
//   }
//   // const reducer = ;
//   console.log(Y);
//   console.log(Z)
//   return Y.reduce((accumulator, currentV) => accumulator + currentV);
// }
//
//
// baseball([5,-2,4,9, "D", "+", "+"]);
// baseball([5,-2,4,"C", "D", 9, "+", "+"]);
// baseball([5,2, "C", "D", "+"]);




///
function baseball(ops){

  let Y = [];
  for(i in ops){
    let X = Y.length;

    if(ops[i] === "D") Y.push(Y[X -1] * 2);
    else if(ops[i] === "+") Y.push(Y[X -1] + Y[X -2]);
    else if(ops[i] === "C") Y.pop();
    else Y.push(parseInt(ops[i]));
  }
  return Y.reduce((acc, cV) => acc + cV);
}

baseball([5,-2,4,9, "D", "+", "+"]);
baseball([5,-2,4,"C", "D", 9, "+", "+"]);
baseball([5,2, "C", "D", "+"]);
