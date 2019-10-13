export const createRandomIds = count =>
  Array(count)
    .fill()
    .map(createRandomId);

// TODO: Replace timestamp with something more reliable
export const createRandomId = () => Date.now();
