import React from 'react';

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (    
  <div className='relative z-10'>  
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">      
    <div class="relative mx-auto p-4 w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      {children}
      </div>
  </div>
  </div>
  </div>
  );
};

export default Modal;