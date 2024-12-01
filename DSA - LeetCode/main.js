// REVERSE ARRAY WITHOUT .REVERSE()
function reverseArrayWithoutReverse() {
  const arr1 = ["a", "b", "c", "d"];
  const arr2 = [1, 2, 3, 4];

  function reverseArrayWithPush(arr) {
    let reversedArray = [];

    for (let i = arr.length - 1; i >= 0; i--) {
      reversedArray.push(arr[i]);
    }

    return reversedArray;
  }

  console.log(reverseArrayWithPush(arr1));

  function reverseArrayNoMethod(arr) {
    let reversedArray = [];
    let start = 0;

    for (let i = arr.length - 1; i >= 0; i--) {
      reversedArray[start] = arr[i];
      start++;
    }

    return reversedArray;
  }

  console.log(reverseArrayNoMethod(arr2));

  //single pointer
  function reverseArrayNoMethodInPlace(arr) {
    for (let i = 0; i < arr.length / 2; i++) {
      let value = arr[i];
      arr[i] = arr[arr.length - 1 - i];
      arr[arr.length - 1 - i] = value;
    }

    return arr;
  }

  console.log(reverseArrayNoMethodInPlace(arr2));
}

reverseArrayWithoutReverse();

function flattenArrayWihtoutFlat() {
  const arr = [
    [1, null, 3],
    [4, 5, [6, 7, ["text"]]],
    [7, "text2", 9],
  ];
  const result1 = [];

  const result2 = [];

  function flattenWithoutFlat(arr) {
    arr.forEach((element) => {
      if (typeof element === "object" && element !== null) {
        flattenWithoutFlat(element);
      } else {
        if (element === null) {
          return;
        }
        result1.push(element);
      }
    });

    return result1;
  }

  console.log(flattenWithoutFlat(arr));

  function flattenWithoutMethods(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (typeof arr[i] === "object" && arr[i] !== null) {
        flattenWithoutMethods(arr[i]);
      } else {
        if (arr[i] === null) {
          continue;
        }
        result2[result2.length] = arr[i];
      }
    }

    return result2;
  }

  console.log(flattenWithoutMethods(arr));

  // No typeOf check Uses Array.isArray
  // function flattenWithoutMethods(arr) {
  //   for (let i = 0; i < arr.length; i++) {
  //     if (Array.isArray(arr[i]) && arr[i] !== null) {
  //       flattenWithoutMethods(arr[i]);
  //     } else {
  //       if (arr[i] === null) {
  //         continue;
  //       }
  //       result2[result2.length] = arr[i];
  //     }
  //   }
  //
  //   return result2;
  // }
}

flattenArrayWihtoutFlat();

function customMapImplementation() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function multiplyByTwo(number) {
    return number * 2;
  }

  function customMapImplementaion(arr, callback) {
    let mappedArr = [];

    arr.forEach((element) => {
      mappedArr.push(callback(element));
    });

    return mappedArr;
  }

  console.log(customMapImplementaion(arr, multiplyByTwo));

  function customMapImplementaionNoMethods(arr, callback) {
    let mappedArr = [];

    for (let i = 0; i < arr.length; i++) {
      mappedArr[mappedArr.length] = callback(arr[i]);
    }

    return mappedArr;
  }

  console.log(customMapImplementaionNoMethods(arr, multiplyByTwo));
}

customMapImplementation();
