import React, { useState } from 'react';

function Navbar(props) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const { setShowModal, setModalMode } = props;


  function handleSubmit(event) {
    event.preventDefault();
    
    fetch(`http://edu.project.etherial.fr/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        'password_verif': passwordConfirmation,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 201) {
          setShowModal(false);
        }
      }
    );
  }

  return (
    <>    
      <div className="py-6 px-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h3>
          <form className="space-y-6 w-[400px]" action="#" onSubmit={handleSubmit}>
              <div>
                  <label for="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your firstname</label>
                  <input type="text" name="firstname" id="firstname" placeholder="John" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={(event) => setFirstname(event.target.value)} />
              </div>
              <div>
                  <label for="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your lastname</label>
                  <input type="text" name="lastname" id="lastname" placeholder="Doe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={(event) => setLastname(event.target.value)} />
              </div>
              <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required onChange={(event) => setEmail(event.target.value)} />
              </div>
              <div>
                  <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={(event) => setPassword(event.target.value)} />
              </div>
              <div>
                  <label for="passwordConfirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password confirmation</label>
                  <input type="password" name="passwordConfirmation" id="passwordConfirmation" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={(event) => setPasswordConfirmation(event.target.value)} />
              </div>
              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Already have an account? <span className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => setModalMode('login')}>Login</span>
              </div>
          </form>
      </div>        
    </>
  );
}

export default Navbar;