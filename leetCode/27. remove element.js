//beats 84% runtime

Function removeElement(nums, val){
 Let indexV;
 while(indexV !== -1){
  indexV = nums.indexOf(val);
  indexV > -1 ? nums.splice(indexV,1):0
 }
 return nums.length;
}
