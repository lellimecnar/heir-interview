import createActionContext from '@/utils/createActionContext';
import { initialState, State } from './state';
import { actionFactory } from './actions';

export const { connectActionContext, useActionContext, withActionContext } =
	createActionContext(initialState, actionFactory);
