let inboxCache: any[] = [];
let lastFetch = 0;

export async function getCachedInbox(fetcher: () => Promise<any[]>) {
  const now = Date.now();

  if (now - lastFetch < 60000 && inboxCache.length > 0) {
    return inboxCache;
  }

  inboxCache = await fetcher();
  lastFetch = now;

  return inboxCache;
}
