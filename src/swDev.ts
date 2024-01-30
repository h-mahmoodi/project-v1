const swDev = () => {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(swUrl).then((res) => {
      console.warn("res", res);
    });
  }
};

export default swDev;
