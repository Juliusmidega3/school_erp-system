import React from 'react';

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl p-4 shadow ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div>{children}</div>;
};
