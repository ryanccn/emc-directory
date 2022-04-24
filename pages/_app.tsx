import type { AppProps } from 'next/app';
import '~/styles/tailwind.css';
import '~/styles/icons-minecraft-0.52.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
