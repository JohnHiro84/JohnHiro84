//May leetcode challenge
//First Unique Character in a String

var firstUniqChar = function(s) {
  if(!s) return -1;
  if(s.length === 0 || s === null) return -1;
  let arr = s.split('').sort();
  let firstIdx = s.length;
    
  for(i=0;i<arr.length;i++){
      if(arr[i] !== arr[i+1] && arr[i] !== arr[i-1]){
          if(s.indexOf(arr[i]) < firstIdx){
              firstIdx = s.indexOf(arr[i]);
          }
      }
  } 
  if(firstIdx === s.length) return -1;
  return firstIdx;     
};
  
