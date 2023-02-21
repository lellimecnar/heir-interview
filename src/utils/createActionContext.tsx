/* eslint-disable react/display-name */
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import memoize from 'lodash/memoize';

const createActionContext = <
	State extends object,
	ActionReducers extends Record<string, (...payload: any[]) => State>,
	ActionType extends string = keyof ActionReducers & string,
>(
	initialState: State,
	actionFactory: (state: State) => ActionReducers,
) => {
	type ActionPayload<T extends ActionType = ActionType> = Parameters<
		ActionReducers[T]
	>;

	type Action<T extends ActionType = ActionType> = {
		[K in T]: {
			type: K;
			payload: ActionPayload<K>;
		};
	}[T];

	type Actions = {
		[K in ActionType]: (...payload: ActionPayload<K>) => void;
	};

	const Context = createContext<[State, Actions]>([
		initialState,
		{} as Actions,
	]);

	const memoizedActionFactory = memoize(actionFactory);

	const reducer = (state: State, { type, payload }: Action) =>
		memoizedActionFactory(state)[type]?.(...payload) ?? state;

	const createActions = memoize((dispatch: React.Dispatch<Action>) =>
		Object.keys(actionFactory(initialState)).reduce(
			(result, type) => ({
				...result,
				[type]: (...payload: ActionPayload) =>
					dispatch({ type, payload } as Action),
			}),
			{} as Actions,
		),
	);

	const Provider: React.ComponentType<React.PropsWithChildren<{}>> = ({
		children,
	}) => {
		const [state, dispatch] = useReducer(reducer, initialState);
		const actions = createActions(dispatch);
		const value = useMemo<[State, Actions]>(
			() => [state, actions],
			[state, actions],
		);
		return <Context.Provider value={value}>{children}</Context.Provider>;
	};

	const Consumer: React.ComponentType<{
		children: (state: State, actions: Actions) => React.ReactNode;
	}> = ({ children }) => (
		<Context.Consumer>
			{([state, actions]) => children(state, actions)}
		</Context.Consumer>
	);

	const useActionContext = () => useContext(Context);

	const connectActionContext =
		<T extends object>(
			Comp: React.ComponentType<T>,
		): React.ComponentType<T> =>
		(props) =>
			(
				<Provider>
					<Comp {...props} />
				</Provider>
			);

	const withActionContext =
		<T extends object>(
			Comp: React.ComponentType<
				Omit<T, keyof State & 'actions'> &
					Partial<State> & { actions?: Actions }
			>,
		): React.ComponentType<T> =>
		(props) =>
			(
				<Consumer>
					{(state, actions) => (
						<Comp {...{ ...props, ...state, actions }} />
					)}
				</Consumer>
			);

	return {
		useActionContext,
		connectActionContext,
		withActionContext,
	} as const;
};

export default createActionContext;
