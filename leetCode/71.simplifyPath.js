var simplifyPath = function(path){
  var str1 = "";
  var str2 = "";

  if(path[path.length-1] === "/"){
    str1 = path.substring(0, path.length-1);
  } else {
    str1 = path;
  }
  console.log(str1);


  strArr = str1.split("/");
  outputArr = []
  outputStr = "";

  for(i in strArr){
    if(strArr[i] === ".."){
      outputArr.pop();
    }
    if(strArr[i] !== '' && strArr[i] !=='.' && strArr[i] !=='..'){
      outputArr.push("/" + strArr[i]);      
    }
  }
  if(outputArr.length < 1){
    outputArr.push("/");
  }
  const reducer = (accumulator, currentV) => accumulator + currentV;
  str2 =  outputArr.reduce(reducer) ; 
  return str2;
}
