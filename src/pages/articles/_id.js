import React, { useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticle } from '../../providers/ArticleStore';

function Article() {
  const { id } = useParams();
  const { fetchArticle, article } = useContext(useArticle);

  useEffect(() => {
    fetchArticle(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Link className="text-indigo-500" to="/articles">Back to articles</Link>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{article?.User && article?.User.lastname + ' ' + article?.User.firstname}</h2>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{article?.title}</h1>
                <p className="leading-relaxed text-lg mb-4">{article && article?.content}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Article;