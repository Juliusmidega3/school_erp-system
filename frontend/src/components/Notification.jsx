import React from 'react';

const Notification = ({ message, type }) => {
  return (
    <div className={`p-4 mb-4 text-white rounded ${type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
      {message}
    </div>
  );
};

export default Notification;
