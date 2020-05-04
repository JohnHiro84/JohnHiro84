//
//
// random ransom note string
// another string has letters from all the magazines
//
// can ransom note be made from the magazines?
// return true or false
//
// each letter in mag can only be used once in your ransom note
//
//
// a   b     false
// aa  ab    false
// aa  aab   true
//
//
// string.Remove(2, 1);
// starting index, num chars

var canConstruct = function(ransomNote, magazine){
  let mag = magazine.split('');
  for(char in ransomNote){
    let char_idx = mag.indexOf(ransomNote[char]);
    console.log(ransomNote[char]);
    if(char_idx >= 0){
      mag.splice(char_idx, 1);
    } else {
      return false;
    }
  }
  return true;
}
canConstruct('a', 'b')
canConstruct('aa', 'ab');
canConstruct('aa', 'aab');
