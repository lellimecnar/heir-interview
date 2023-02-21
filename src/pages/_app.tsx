import type { AppProps } from 'next/app';
import { Source_Sans_3 } from '@next/font/google';

import { connectActionContext } from '@/context';
import Header from '@/components/Header';

const sourceSans = Source_Sans_3({
	style: ['normal', 'italic'],
	weight: ['200', '400', '700', '900'],
	subsets: ['latin', 'latin-ext'],
});

const App = ({ Component, pageProps }: AppProps) => (
	<main className={sourceSans.className}>
		<Header />
		<Component {...pageProps} />
	</main>
);

export default connectActionContext(App);
