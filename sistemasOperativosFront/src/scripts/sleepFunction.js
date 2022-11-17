async function sleep (milis) {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, milis);
    });
  };

  export {
    sleep
  }
 