const swDev = () => {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register(swUrl).then((res) => {
      console.warn("Service Worker is running", res);
    });
  }
};

export default swDev;
