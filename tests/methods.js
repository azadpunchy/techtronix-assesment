const methods = {
  // wait for next execution
  wait: (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, time);
    });
  },
};

export default methods;
