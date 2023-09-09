import React from 'react';

const Post = ({ isOpen, onClose, children }) => {
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center z-50' : 'hidden';

  return (
    <div className={modalClasses}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50">
        <div className="modal-close absolute top-0 right-0 cursor-pointer p-4" onClick={onClose}>
          <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M1.39 1.405a1 1 0 011.407 0L9 7.593l6.193-6.188a1 1 0 111.414 1.414L10.414 9l6.193 6.193a1 1 0 11-1.414 1.414L9 10.407l-6.193 6.194a1 1 0 01-1.414-1.414L7.586 9 .976 2.599a1 1 0 010-1.414z"/>
          </svg>
        </div>
        <div className="modal-content py-4 text-left px-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Post;
