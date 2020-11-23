import '@testing-library/jest-dom';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ContextContainer from './containers/ContextContainer';
import LayoutContainer from './containers/LayoutContainer';
import { pipe } from './helpers/generics';

export const withWrapper = (Wrapper, wrapperProps = {}) => children =>
	<Wrapper {...wrapperProps}>{children}</Wrapper>;

export const withRouter = withWrapper(BrowserRouter);
export const withContext = withWrapper(ContextContainer);
export const withLayout = withWrapper(LayoutContainer);

export const render = (...wrappers) => children => rtlRender(
	pipe(...wrappers)(children)
);

export const setup = (...builtins) => (...fns) =>
	builtins.forEach((builtin, ix) =>
		builtin(() =>
			fns[0].length ? fns[ix].forEach(f => f()) : fns.forEach(f => f())
		)
	);
