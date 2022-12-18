import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { useArticle } from "../../providers/ArticleStore";

function Articles() {
  const { articles, decreasePagination, increasePagination, pages, setPagination, categories } = useContext(useArticle);
  const [category, setCategory] = useState('all');

  return (
    <div>            
      <section className="text-gray-600 body-font">
        <div className="container mx-auto">
          <div className="w-full mx-auto overflow-auto">
            <select className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block my-4 p-3 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(event) => setCategory(event.target.value)}>
              <option value={'all'}>All categories</option>
              {categories && categories.map((category, index) => (
                <option value={category.name} key={index}>{category.name}</option>
              ))}
            </select>
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">User</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Title</th>
                </tr>
              </thead>
              <tbody>
                {articles.filter(article => article.ArticleCategory.name === category || category === 'all').map((article, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2 w-[200px] text-ellipsis">{article.User.firstname}</td>
                    <td className="border border-gray-200 flex w-full">
                      <Link to={`/articles/${article.id}`} key={index} className="grow px-4 py-3 hover:bg-gray-100">
                        {article.title}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1" onClick={decreasePagination}>
              Previous
            </button>

            {Array.from(Array(pages).keys()).map((page, index) => (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded" onClick={() => setPagination(index)} key={index}>
                {index + 1}
              </button>
            ))}

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-1" onClick={increasePagination}>
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Articles;