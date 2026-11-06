import { defineConfig } from 'vite'

const repairMirroredHead = {
  name: 'repair-mirrored-head',
  transformIndexHtml(html) {
    const meta = '<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->'
    return html.replace(meta, '').replace('<head>', `<head>${meta}`)
  },
}

export default defineConfig({
  plugins: [repairMirroredHead],
})
