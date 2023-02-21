import uniqueId from 'lodash/uniqueId';

import type { State, Question } from './state';

export const actionFactory = (state: State) => ({
	addQuestion: (username: string, question: string): State => ({
		...state,
		questions: [
			...state.questions,
			{
				id: uniqueId(),
				username,
				question,
				score: 0,
			} as Question,
		],
	}),
	upvoteQuestion: (questionId: string): State => ({
		...state,
		questions: state.questions.map((question) => {
			if (question.id === questionId) {
				return {
					...question,
					score: question.score + 1,
				};
			}

			return question;
		}),
	}),
	downvoteQuestion: (questionId: string): State => ({
		...state,
		questions: state.questions.map((question) => {
			if (question.id === questionId) {
				return {
					...question,
					score: Math.max(0, question.score - 1),
				};
			}

			return question;
		}),
	}),
	// reorderQuestion: (questionId, newIndex): State => ({
	//     ...state,
	//     questions:

	// }),
});
