

var canConstruct = function(ransomNote, magazine){
  let mag = magazine.split('');
  for(char in ransomNote){
    let char_idx = mag.indexOf(ransomNote[char]);
    if(char_idx >= 0){
      mag.splice(char_idx, 1);
    } else {
      return false;
    }
  }
  return true;
}
