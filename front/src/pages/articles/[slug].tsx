import React from "react";
import Head from "next/head";
import styles from "../../styles/Article.module.css";
import { Article } from "@/types";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";

type Props = {
  article: Article;
};

// 記事の詳細ページ

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://api:3000/api/v1");
  const data = await res.json();
  const articles: Article[] = data.articles;

  const paths = articles.map((article: Article) => ({
    params: { slug: article.slug.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const res = await fetch(`http://api:3000/api/v1/articles/${params.slug}`);
  const data = await res.json();
  const article: Article = data.article;

  // console.log(article);

  return {
    props: {
      article,
    },
    revalidate: 60,
  };
};

const ShowArticle = ({ article }: Props) => {
  const router = useRouter();

  const backbutton = () => {
    router.push("/");
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{article.description}</title>
      </Head>
      <div className={styles.container}>
        <h1>記事詳細</h1>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.date}>投稿日時:{article.createdAt}</p>
        <h3>説明</h3>
        <p className={styles.content}>{article.description}</p>
        <h3>本文</h3>
        <p className={styles.content}>{article.body}</p>
        <div className={styles.createButton} onClick={backbutton}>
          一覧へ戻る
        </div>
      </div>
    </>
  );
};

export default ShowArticle;
