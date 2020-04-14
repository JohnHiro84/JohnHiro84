function binarySearch(nums, target){

  let left = 0;
  let right = nums.length -1;
 

  while (left <= right){
    pivot = left + (right - left) / 2;

    console.log(left + "/" + right + "/" + pivot);
    if(nums[pivot] === target){
      return pivot;
    } else if (nums[pivot] > target){
      //search left
      right = pivot -1;
    } else {
      //search right
      left = pivot +1;
    }
  }
  return -1;
}

binarySearch([1,2,3,4,5,6,7], 7);