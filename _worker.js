export default {
  async fetch(request, env) {
    // Try serving static asset first
    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404) return asset;

    // SPA fallback — serve index.html for client-side routes
    return env.ASSETS.fetch(
      new Request(new URL('/index.html', request.url), request)
    );
  },
};
