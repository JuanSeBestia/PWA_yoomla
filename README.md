# PWA_yoomla

How to make your Joomla page work with PWA (Progressive Web App) using Workbox [https://github.com/JuanSeBestia/PWA_yoomla](https://github.com/JuanSeBestia/PWA_yoomla)

In this proyect, you’ll use [Workbox](https://workboxjs.org/) to convert a Joomla web site into a Progressive Web App with offline functionality and fast performance. Workbox allows you to create production quality service workers that follow best practices and handle corner cases, making your development process simpler and your web app more reliable. see ([Build a PWA using Workbox](https://codelabs.developers.google.com/codelabs/workbox-lab/))

You can see demo in ([inkremental.co](inkremental.co))

## 1. Star and Fork this proyect 👆

## 2. Edit manifest.json

It is mandatory to have the attributes name, short_name, start_url, icons (at least it must contain an image of 192)
see ([Google Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/))

### 3. Edit sw.js

Edit the sw.js according to what you need for your page, for this case we will pre-cache (when loading it for the first time, load all in the background) of the static pages in two languages, all js, to the css, images ( png | jpg | jpeg | svg | gif format), fonts, call api google like google maps, articles with pattern specifict

### 4. Upload files

With FTP or other way, upload the files sw.js, manifest.json and assets (like offline.html, 404.html, logo_inkremental_192.png) to the root where Joomla is located

### 5. Add custom code in head

In Joomla admin --> Extensions --> Templates --> Default Template --> Custom Code --> Before </head> add follow lines

``` html
<!-- SW configs -->
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('service worker installed'))
        .catch(err => console.log('Error', err));
    }
  </script>

<!-- PWA configs -->
<link rel="manifest" href="/manifest.json">

<!-- Optional mobile view configs -->
<meta name="theme-color" content="#03a9f4">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="yes" />
```

![joomla_pwa_1.png](joomla_pwa_1.png)

### 5. Add to home screen and enjoy