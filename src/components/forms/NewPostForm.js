import React, { useState, useContext } from 'react';
import { useAuth } from '../../providers/AuthStore';

function Navbar(props) {
  const { token } = useContext(useAuth);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { setShowModal } = props;

  function handleSubmit(event) {
    event.preventDefault();
    
    fetch(`http://edu.project.etherial.fr/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        content,
        'article_category_id': 8
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
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create a new post</h3>
          <form className="space-y-6 w-[600px]" action="#" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input type="text" name="title" id="title" placeholder="The title of a superbe post" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={(event) => setTitle(event.target.value)} />
            </div>

            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
              <textarea name="content" id="content" placeholder="The content of a superbe post" className="bg-gray-50 min-h-[200px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required onChange={(event) => setContent(event.target.value)}>

              </textarea>
            </div>

            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send the post</button>
          </form>
      </div>        
    </>
  );
}

export default Navbar;