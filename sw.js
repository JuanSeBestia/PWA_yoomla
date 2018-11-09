/**
 * @author juansed (github.com/juanSeBestia)
 * @date 06-11-2018
 */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');
if (!workbox) {
    console.error(`Boo! Workbox didn't load 😬`);
}
else {
    console.log(`Yay! Workbox is loaded 🎉`);
    workbox.setConfig({
        debug: false
    });

    self.workbox.skipWaiting();
    self.workbox.clientsClaim();
    workbox.precaching.precache([
        '/',

        // English
        '/en',
        '/en/',
        '/en/portfolio-inkremental',
        '/en/solutions',
        '/en/about-us',
        '/en/contact',

        // Spanish
        '/es',
        '/es/',
        '/es/proyectos',
        '/es/soluciones',
        '/es/nosotros',
        '/es/nosotros',

        // Staging
        // '/proyectos',
        // '/products',
        // '/nosotros',
        // '/contactanos',

        // Ofline pages
        '/offline.html',
        '/404.html',
    ]);

    workbox.precaching.addRoute();
    //workbox.precaching.precacheAndRoute([]);

    workbox.routing.registerRoute(
        /.*\.(?:js)/,
        workbox.strategies.cacheFirst({
            cacheName: 'js-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 300,
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );

    workbox.routing.registerRoute(
        /.*\.css/,
        workbox.strategies.cacheFirst({
            cacheName: 'styles-cache',
        })
    );

    workbox.routing.registerRoute(
        /.*\.(?:png|jpg|jpeg|svg|gif)/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 500,
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );


    workbox.routing.registerRoute(
        new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
        workbox.strategies.cacheFirst({
            cacheName: 'googleapis',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 500,
                }),
            ],
        })
    );

    workbox.routing.registerRoute(
        /.*(?:googleapis|gstatic)\.com.*$/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'googleapis-maps',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 500,
                }),
            ],
        })
    );
    
    // Not use on inkremental.co
    var articleHandler = workboxSW.strategies.networkFirst({
        cacheName: 'articles-cache',
        cacheExpiration: {
            maxEntries: 100
        }
    });

    workboxSW.router.registerRoute('/**/pages/article*.html', args => {
        return articleHandler.handle(args).then(response => {
            if (!response) {
                return caches.match('assets_pwa/offline.html');
            } else if (response.status === 404) {
                return caches.match('assets_pwa/404.html');
            }
            return response;
        });
    });

    //workbox.googleAnalytics.initialize();

}
