module.exports = (flow) => {
  if (!Array.isArray(flow)) {
    throw new Error('The flow must be an array');
  }

  return async (value) => {
    const flowLength = flow.length;
    let result = value;
    for (let i = 0; i < flowLength; i += 1) {
      result = await flow[i](result); // eslint-disable-line no-await-in-loop
    }
    return result;
  };
};
