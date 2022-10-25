function findDuplicateTransactions(transactions) {
     //creating and sorting a shallow copy of the input transaction
  const transactionCopy = transactions.slice().sort((a, b) => {
    return a.id - b.id;
  });

  //creating result array that contains elements that meet the required conditions in the respective groups
  const result = [];

  //Function that evaluates time difference in minutes
  function timeDiff(date1, date2) {
    // getTime convert the time in iso time format to milliseconds
    return (new Date(date1).getTime() - new Date(date2).getTime()) / 60000;
  }

  //Checkng for conditions and group allocation
  while (transactionCopy.length) {
    const group = [];
    let ref = transactionCopy.shift();

    group.push(ref);
    for (let i = 0; i < transactionCopy.length; i++) {
      if (
        ref.sourceAccount === transactionCopy[i].sourceAccount &&
        ref.targetAccount === transactionCopy[i].targetAccount &&
        ref.amount === transactionCopy[i].amount &&
        ref.category === transactionCopy[i].category &&
        timeDiff(transactionCopy[i].time, ref.time) <= 1
      ) {
        group.push(transactionCopy[i]);
        ref = transactionCopy[i];
        transactionCopy.splice(i, 1);
        i -= 1;
      }
    }

    if (group.length > 1) {
      result.push(group);
    }
  }
  return result;
}


export default findDuplicateTransactions;
