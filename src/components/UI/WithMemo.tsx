import React, { memo } from 'react';

const withMemo = <T extends object>(
	Component: React.ComponentType<T>
): React.MemoExoticComponent<React.ComponentType<T>> => memo(Component);

export default withMemo;
