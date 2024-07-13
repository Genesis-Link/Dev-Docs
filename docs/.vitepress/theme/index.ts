import DefaultTheme from 'vitepress/theme'
import 'viewerjs/dist/viewer.min.css'
import imageViewer from 'vitepress-plugin-image-viewer'
import { useRoute } from 'vitepress'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
  },
  setup() {
    const route = useRoute()
    // Using imageViewer
    imageViewer(route)
  }
}