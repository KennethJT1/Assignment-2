function classifier(input) {
  const inputArr = [...input];
  const result = {};
  // return if input is not an array or array length is less than 1
  if (!input.length) {
    result.noOfGroups = 0;
    return result;
  }

  // throw an error if the input is not object
  if (typeof input !== "object") {
    throw new Error("Invalid Input");
  }

  // calculating the year in each object and sorting their age in ascending order
  const ageList = inputArr
    .map((candidates) => {
      candidates.age = 2019 - new Date(candidates.dob).getFullYear();
      return candidates;
    })
    .sort((a, b) => {
      return a.age - b.age;
    });
  // console.log(ageList);

  // initialize group1 with the first candidate
  const biggerArray = [];
  let smallArr = [];

  smallArr.push(ageList[0]);
  for (let i = 1; i < ageList.length; i++) {
    if (ageList[i].age - smallArr[0].age <= 5 && smallArr.length < 3) {
      smallArr.push(ageList[i]);
    } else {
      biggerArray.push(smallArr);
      smallArr = [];
      smallArr.push(ageList[i]);
    }
  }

  // Pushes the last group
  if (smallArr.length > 0) {
    biggerArray.push(smallArr);
  }

  result.noOfGroups = biggerArray.length;

  // Formatting the result object
  for (let i = 0; i < biggerArray.length; i++) {
    result[`group${i + 1}`] = {
      members: biggerArray[i],
      oldest: biggerArray[i][biggerArray[i].length - 1].age,
      sum: biggerArray[i].reduce((acc, current) => {
        return (acc += current.age);
      }, 0),
      regNos: biggerArray[i]
        .map((candidates) => {
          return parseInt(candidates.regNo);
        })
        .sort((a, b) => {
          return a - b;
        }),
    };
  }
  return result;
}

export default classifier;