import { ChangeEvent, FormEvent } from "react";
import React from "react";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
// @ts-ignore
import axios from "axios";

const CreateAricle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

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

    // axiosで記事を作成する
    try {
      await axios.post("http://192.168.2.108:3000/api/v1/articles", {
        title: title,
        description: description,
        body: body,
      });
      router.push("/");
    } catch (error) {
      alert("登録に失敗しました");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>新規記事登録</h1>
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
            登録する
          </button>
        </form>
        <Link href="/" className={styles.createButton}>
          一覧画面へ
        </Link>
      </div>
    </>
  );
};

export default CreateAricle;
