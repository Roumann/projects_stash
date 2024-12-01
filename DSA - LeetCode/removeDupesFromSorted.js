function removeDuplicates(nums) {
  let temp = [...new Set(nums)];
  nums.length = 0; // deletes all elements in array in place without creating new array
  nums.push(...temp);
  return nums.length;
}

removeDuplicates();
