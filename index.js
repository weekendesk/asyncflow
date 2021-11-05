module.exports = (...args) => {
  let flow = args;
  if (flow.length === 1 && Array.isArray(flow[0])) {
    ([flow] = flow);
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
