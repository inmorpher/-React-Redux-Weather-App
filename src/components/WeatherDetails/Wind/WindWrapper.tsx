import { ReactNode } from 'react';

const WindWrapper = ({ children }: { children: ReactNode }) => {
	return <div className='relative flex flex-1 flex-col'>{children}</div>;
};

export default WindWrapper;
