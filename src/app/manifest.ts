import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    "name": "factuality.wtf",
    "short_name": "factuality",
    "start_url": "/",
    "display": "standalone",
    "background_color": "#232136",
    "theme_color": "#eb6f92",
    "icons": [
      {
        "src": "/icons/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/icons/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  }
}
