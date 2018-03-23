import isEmpty from 'lodash/isEmpty';
import curry from 'lodash/curry';

const altCollection = (func1, func2, collection) => {
  const firstBranch = func1(collection);
  return !isEmpty(firstBranch) ? firstBranch : func2(collection);
};

export const alternateCollection = curry(altCollection);
