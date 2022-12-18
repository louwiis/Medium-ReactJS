import React, { useContext } from 'react';
import { useAuth } from '../../providers/AuthStore';
import { useArticle } from '../../providers/ArticleStore';
import { useForm } from "react-hook-form";

function Navbar(props) {
  const { token } = useContext(useAuth);
  const { categories } = useContext(useArticle);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { setShowModal } = props;
  
  return (
    <>    
      <div className="py-6 px-6 lg:px-8">
          <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create a new post</h3>
          <form className="space-y-6 w-[600px]" action="#" onSubmit={handleSubmit((data) => {
            fetch(`http://edu.project.etherial.fr/articles`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
              },
              body: JSON.stringify({
                title: data.title,
                content: data.content,
                article_category_id: data.category
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.status === 201) {
                  setShowModal(false);
                }
              }
            );
          })}>
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="The title of a superbe post"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                {...register("title", { required: true, maxLength: 80 })}
              />
              {errors.title && <span>This field is required</span>}
              {errors.title?.type === "maxLength" && <span>Max length exceeded</span>}
            </div>
            
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
              <select
                name="category"
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                {...register("category", { required: true })}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {errors.category && <span>This field is required</span>}
            </div>

            <div>
              <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
              <textarea 
                name="content"
                id="content"
                placeholder="The content of a superbe post"
                className="bg-gray-50 min-h-[200px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                {...register("content", { required: true, maxLength: 500 })}
              ></textarea>
              {errors.content && <span>This field is required</span>}
              {errors.content?.type === "maxLength" && <span>Max length exceeded</span>}
            </div>

            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send the post</button>
          </form>
      </div>        
    </>
  );
}

export default Navbar;