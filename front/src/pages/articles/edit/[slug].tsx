import { ChangeEvent, FormEvent } from "react";
import Head from "next/head";
import React from "react";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Article } from "@/types";
// @ts-ignore
import axios from "axios";

type Props = {
  article: Article;
};

// 記事を編集するためどの記事を編集するのかslugを取得する必要がある
export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1`);
  const data = await res.json();
  const article: Article[] = data.articles;

  // articlesがundefinedの場合は空の配列を返すデプロイ時にエラーが出る
  if (!article) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const paths = article.map((article: Article) => ({
    params: { slug: article.slug.toString() },
  }));

  // console.log(paths);
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/articles/${params.slug}`
  );
  const data = await res.json();
  const article: Article = data.article;

  return {
    props: {
      article,
    },
    revalidate: 60,
  };
};

const EditAritcle = ({ article }: Props) => {
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const [body, setBody] = useState(article.body);
  const router = useRouter();

  if (!article) {
    return <div>記事が見つかりません。</div>;
  }

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(/^[ぁ-んァ-ン一-龥]/)) {
      alert("タイトルは日本語では入力できません");
      return;
    }
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 30) {
      alert("内容は30文字以内で入力してください");
      return;
    }
    setDescription(e.target.value);
  };

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handlSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // console.log(title, description, body);

    // バリデーション
    if (title === "" || description === "" || body === "") {
      alert("タイトルと内容と本文は必須です");
      return;
    }

    // axiosで記事を編集する
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_IP_ENDPOINT}/v1/articles/${article.slug}`,
        {
          title: title,
          description: description,
          body: body,
        }
      );
      router.push("/");
    } catch (error) {
      alert("編集に失敗しました");
    }
  };

  return (
    <>
      <Head>
        <title>編集</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>新規記事編集</h1>
        <form className={styles.form} onSubmit={handlSubmit}>
          <label htmlFor="title" className={styles.label}>
            タイトル
            <small className={styles.danger}>
              日本語禁止です。URLになります
            </small>
          </label>
          <input
            type="text"
            id="title"
            className={styles.input}
            value={title}
            onChange={handleTitleChange}
          />
          <label htmlFor="description" className={styles.label}>
            内容
          </label>
          <textarea
            id="description"
            className={styles.textarea}
            value={description}
            onChange={handleDescriptionChange}
          />
          <label htmlFor="body" className={styles.label}>
            本文
          </label>
          <textarea
            id="body"
            className={styles.textarea}
            value={body}
            onChange={handleBodyChange}
          />

          <button type="submit" className={styles.button}>
            編集する
          </button>
        </form>
        <Link href="/" className={styles.createButton}>
          一覧画面へ
        </Link>
      </div>
    </>
  );
};

export default EditAritcle;
