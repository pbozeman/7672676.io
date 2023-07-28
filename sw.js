//
// ignore byte range fetching of sounds so that we can
// cache them. (Chrome will cache them without this, but
// safari won't.)
//
self.addEventListener("fetch", async event => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/sounds/')) {
    // Headers in the original request can't be modified.
    const newHeaders = new Headers(event.request.headers);
    newHeaders.delete('Range');

    const newRequest = new Request(event.request.url, {
      method: event.request.method,
      headers: newHeaders,
      body: event.request.body,
      mode: event.request.mode,
      credentials: event.request.credentials,
      cache: event.request.cache,
      redirect: event.request.redirect,
      referrer: event.request.referrer,
      integrity: event.request.integrity
    });

    event.respondWith(fetch(newRequest));
  } else {
    event.respondWith(fetch(event.request));
  }
});
