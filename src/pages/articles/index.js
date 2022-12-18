import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { useArticle } from "../../providers/ArticleStore";

function Articles() {
  const { articles, decreasePagination, increasePagination, pages, setPagination } = useContext(useArticle);
  
  return (
    <div>            
      <section className="text-gray-600 body-font">
        <div className="container mx-auto">
          <div className="w-full mx-auto overflow-auto">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">User</th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Title</th>
                </tr>
              </thead>
              <tbody>
              { articles && articles.map((article, index) => (
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