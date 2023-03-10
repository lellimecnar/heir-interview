import Head from 'next/head';

import QuestionList from '@/components/QuestionList';

const Home = () => (
	<>
		<Head>
			<title>Create Next App</title>
			<meta name="description" content="Generated by create next app" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1"
			/>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<QuestionList />
	</>
);

export default Home;
