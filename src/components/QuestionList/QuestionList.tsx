import { useMemo } from 'react';
import { useActionContext, Question } from '@/context';
import orderBy from 'lodash/orderBy';

import QuestionItem from '../QuestionItem';

const QuestionList = () => {
	const [{ questions }] = useActionContext();
	const sortedQuestions: Question[] = useMemo(
		() => orderBy(questions, 'score', 'desc'),
		[questions],
	);

	return (
		<ul>
			{sortedQuestions.map((question) => (
				<QuestionItem key={question.id} {...question} />
			))}
		</ul>
	);
};

export default QuestionList;
