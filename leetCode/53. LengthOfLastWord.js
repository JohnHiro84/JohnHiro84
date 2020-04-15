53. Length of Last Word



function filterOutQuotes(arr){
  let output = [];
  for(i in arr){
    if(arr[i] !== ''){
      output.push(arr[i]);
    }
  }
  return output;
}

function lengthOfLastWord(s) {
  if (!s.replace(/\s/g, '').length || s.length < 1){
    return 0;
  }
  let arr = s.split(" ");
  let out = [];
  for(a in arr) {
    if(arr[a] !== ''){
      out.push(arr[a]);
    }
  }

  return out[out.length-1].length;
}




