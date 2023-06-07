import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  // This is temporary until admin panel is actually started.
  const AnyComponent = Component as any;

  return <AnyComponent {...pageProps} />
}
