
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


/// cleaned up version

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
