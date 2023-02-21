import { useCallback } from 'react';
import { Question, useActionContext } from '@/context';

export interface QuestionItemProps extends Question {}

const QuestionItem = ({ id, username, question, score }: QuestionItemProps) => {
	const [, { upvoteQuestion, downvoteQuestion }] = useActionContext();
	const up = useCallback(() => {
		upvoteQuestion(id);
	}, [id, upvoteQuestion]);
	const down = useCallback(() => {
		downvoteQuestion(id);
	}, [id, downvoteQuestion]);

	return (
		<li>
			<button onClick={up}>+</button>
			{score}
			<button onClick={down}>-</button>
			<h3>{username}</h3>
			<p>{question}</p>
		</li>
	);
};

export default QuestionItem;
