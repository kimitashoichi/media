import React, { useEffect, useState } from "react";
import { GetAllArticles } from "../api/articles/index";


// このページに遷移したときにDBと接続して全部の記事データを取得するようにしたい
// 通信中はロード画面を表示させるようにする
const IndexArticles = () => {
  const [articles, setArticles] = useState<any>();

  useEffect(() => {
    getData();
  }, []);

  // 記事データ取得処理
  const getData = async () => {
    const allData = await GetAllArticles();
    setArticles(allData.articles);
  }

  return (
    <>
      <div className="container">
        {articles ? 
          articles.map((doc: any) => {
            return <Article article={doc} key={doc.another.length} />
          })
          :
          null
        }
      </div>
    </>
  )
}

export default IndexArticles;

interface Props {
  article: any;
}

const Article: React.FC<Props> = ({
  article
}) => {
  return (
    <>
      <p>{article.another}</p>
      <p>{article.article}</p>
    </>
  )
};