'use strict';

self.addEventListener('fetch', hndlEventFetch);

function hndlEventInstall(evt) {
    /**
     * @returns {Promise<void>}
     */
    async function cacheStaticFiles() {
        const files = [
            './',
            './png',
            './index.html',
            './sw.js',
            './index.js',
            './style.css',
            './media.css',
            './manifest.webmanifest',
        ];
        const cacheStat = await caches.open(CACHE_STATIC);
        await Promise.all(
            files.map(function (url) {
                return cacheStat.add(url).catch(function (reason) {
                    console.log(`'${url}' failed: ${String(reason)}`);
                });
            })
        );
    }

    //  wait until all static files will be cached
    evt.waitUntil(cacheStaticFiles());
}

function hndlEventFetch(evt) {
    async function getFromCache() {
        const cache = await self.caches.open(CACHE_STATIC);
        const cachedResponse = await cache.match(evt.request);
        if (cachedResponse) {
            return cachedResponse;
        }
        // wait until resource will be fetched from server and stored in cache
        const resp = await fetch(evt.request);
        await cache.put(evt.request, resp.clone());
        return resp;
    }

    evt.respondWith(getFromCache());
}

self.addEventListener('install', hndlEventInstall);
self.addEventListener('fetch', hndlEventFetch);