export interface Question {
	id: string;
	username: string;
	question: string;
	score: number;
}

export interface State {
	questions: Question[];
	isAdmin: boolean;
}

export const initialState: State = {
	questions: [],
	isAdmin: true,
};
