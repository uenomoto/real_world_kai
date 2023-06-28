## まみむ memo

### フロント側でも配列の渡し方は大事！

フロントはこう受け取って map 関数にしたい

```jsx
[
next_front  |   {
next_front  |     id: 6,
next_front  |     title: 'test toukou desu',
next_front  |     description: '腹へったんこぶ',
next_front  |     slug: 'test-toukou-desu',
next_front  |     body: 'なんか食べたいんこぶ',
next_front  |     createdAt: '2023/06/29 01:31:29',
next_front  |     updatedAt: '2023/06/29 01:31:29'
next_front  |   },
next_front  |   {
next_front  |     id: 5,
next_front  |     title: 'hajimeteno-toukou',
next_front  |     description: 'Nextからの投稿！！',
next_front  |     slug: 'hajimeteno-toukou',
next_front  |     body: 'いっけえええええええええええええええ',
next_front  |     createdAt: '2023/06/29 01:21:27',
next_front  |     updatedAt: '2023/06/29 01:21:27'
next_front  |   }
next_front  | ]
```

```jsx
export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch("http://api:3000/api/v1");
  const articles = await res.json();
  console.log(articles);
  return {
    props: {
      articles,
    },
    revalidate: 60 * 60,
  };
};
```

このように渡すと、
コンソールの結果がこうなる

```jsx
[
next_front  |   {
next_front  |     articles: [
next_front  |       {
    next_front  |     id: 6,
    next_front  |     title: 'test toukou desu',
    next_front  |     description: '腹へったんこぶ',
    next_front  |     slug: 'test-toukou-desu',
    next_front  |     body: 'なんか食べたいんこぶ',
    next_front  |     createdAt: '2023/06/29 01:31:29',
    next_front  |     updatedAt: '2023/06/29 01:31:29'
    next_front  |   },
    next_front  |   {
    next_front  |     id: 5,
    next_front  |     title: 'hajimeteno-toukou',
    next_front  |     description: 'Nextからの投稿！！',
    next_front  |     slug: 'hajimeteno-toukou',
    next_front  |     body: 'いっけえええええええええええええええ',
    next_front  |     createdAt: '2023/06/29 01:21:27',
    next_front  |     updatedAt: '2023/06/29 01:21:27'
next_front  |      }
next_front  |     ]
next_front  |   }
next_front  | ]
```

これだと map 関数で回せないので、

```jsx
export const getStaticProps: GetStaticProps<Props> = async () => {
  const res = await fetch("http://api:3000/api/v1");
  const data = await res.json();
  console.log(data.articles);
  return {
    props: {
      articles: data.articles, // レスポンスのdataをprops経由でページに渡す
    },
    revalidate: 60 * 60, // 1時間ごとに再生成
  };
};
```

こうすること！
