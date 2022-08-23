import React from 'react';
import './Container.scss';

export const Container = ({ children }: {children: React.ReactNode}): React.ReactElement =>
    <div><div className="container">{children}</div></div>;