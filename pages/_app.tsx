// pages/_app.tsx

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>

      <main>
        {/* Include the NotificationPrompt component */}
        <Component {...pageProps} />
      </main>

    </div>
  );
}

export default MyApp;
