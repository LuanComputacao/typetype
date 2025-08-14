/// <reference types="vite/client" />

// Add type declaration for SVG raw imports
declare module '*.svg?raw' {
  const content: string
  export default content
}
