import React from 'react';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';
import NewPostForm from './forms/NewPostForm';
import ChangePasswordForm from './forms/ChangePasswordForm';


function Navbar(props) {
  const { setModalMode, modalMode, setShowModal } = props;

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button 
                onClick={() => setShowModal(false)}
                type="button" 
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal"
              >
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
              </button>

              {modalMode === 'login' ? (
                <LoginForm setShowModal={setShowModal} setModalMode={setModalMode}/>
              ) : modalMode === 'register' ? (
                <RegisterForm setShowModal={setShowModal} setModalMode={setModalMode} />
              ) : modalMode === 'newPost' ? (
                <NewPostForm setShowModal={setShowModal} />
              ) : modalMode === 'changePassword' ? (
                <ChangePasswordForm setShowModal={setShowModal} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default Navbar;