import type { AppProps } from 'next/app';
import { Source_Sans_3 } from '@next/font/google';

const sourceSans = Source_Sans_3({
	style: ['normal', 'italic'],
	weight: ['200', '400', '700', '900'],
	subsets: ['latin', 'latin-ext'],
});

const App = ({ Component, pageProps }: AppProps) => (
	<main className={sourceSans.className}>
		<Component {...pageProps} />
	</main>
);

export default App;
