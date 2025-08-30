import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ★★★ ここが一番重要です ★★★
  // GitHub Pagesで公開するリポジトリ名を指定します
  base: "/beauteos-user-mock-Ver2/", 
})
