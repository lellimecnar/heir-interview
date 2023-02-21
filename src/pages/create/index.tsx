import { useRouter } from 'next/router';
import { useState, useCallback, useRef } from 'react';

import { useActionContext } from '@/context';

const CreateQuestion = () => {
	const router = useRouter();
	const [, { addQuestion }] = useActionContext();
	const [username, setUsername] = useState('');
	const [question, setQuestion] = useState('');
	const stateRef = useRef({ username, question });
	stateRef.current = {
		username,
		question,
	};
	const submit = useCallback(() => {
		addQuestion(stateRef.current.username, stateRef.current.question);
		router.push('/');
	}, [addQuestion, stateRef, router]);

	return (
		<>
			<label>
				<span>Username</span>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
			</label>
			<label>
				<span>Question</span>
				<textarea
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
					placeholder="Type question here..."
				/>
			</label>
			<button type="button" onClick={submit}>
				Submit
			</button>
		</>
	);
};

export default CreateQuestion;
