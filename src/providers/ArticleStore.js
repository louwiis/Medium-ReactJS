import { createContext, useState, useEffect } from "react";
export const useArticle = createContext()

export function ArticleProvider(props) {
  // for the articles list
  const [articles, setArticles] = useState([]);
  const [pages, setPages] = useState(0);
  const [pagination, setPagination] = useState(0);
  const [categories, setCategories] = useState();
  
  function fetchArticles(id) {
    fetch(`http://edu.project.etherial.fr/articles?offset=${id * 10}`)
    .then((response) => response.json())
    .then((data) => {
      setArticles(data.data);
      setPages(Math.ceil(data.count/10));
    });
  }
  
  function decreasePagination() {
    if (pagination > 0) {
      setPagination(pagination - 1);
    }
  }
  
  function increasePagination() {
    if (pagination < pages - 1) {
      setPagination(pagination + 1);
    }
  }
  
  useEffect(() => {
    fetchArticles(pagination)
    fetchCategories()
  }, [pagination]);  
  
  
  // for the article page
  const [article, setArticle] = useState({});
  
  function fetchArticle(id) {
    fetch(`http://edu.project.etherial.fr/articles/${id}`)
    .then((response) => response.json())
    .then((data) => {
      setArticle(data.data);
    });
  }
  
  function fetchCategories() {
    fetch(`http://edu.project.etherial.fr/articles/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => {
    setCategories(data.data);
  });
}

return (
  <useArticle.Provider value={{
    articles,
    decreasePagination,
    increasePagination,
    pages,
    setPagination,
    fetchArticle,
    article,
    categories
  }}>
  {props.children}
  </useArticle.Provider>
  )
}