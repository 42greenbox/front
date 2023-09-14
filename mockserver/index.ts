async function initMocks() {
  if (typeof window === "undefined") {
    (async () => {
      const { server } = await import("./server");
      server.listen();
    })();
  } else {
    (async () => {
      const { worker } = await import("./browser");
      worker.start();
    })();
  }
}

export default initMocks;
