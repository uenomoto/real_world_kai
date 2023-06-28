## まみむ memo

### フロント側でも配列の渡し方は大事！

フロントはこう受け取って map 関数にしたい

```jsx
[
next_front  |   {
next_front  |     id: 3,
next_front  |     title: 'postman naretekita',
next_front  |     description: 'API叩く',
next_front  |     slug: 'postman-naretekita',
next_front  |     body: '苦戦したがCRUD処理はなんとかできるようになってきた',
next_front  |     created_at: '2023-06-28T13:43:48.434Z',
next_front  |     updated_at: '2023-06-28T13:43:48.434Z'
next_front  |   },
next_front  |   {
next_front  |     id: 1,
next_front  |     title: 'hensyu',
next_front  |     description: 'Ever wonder how?',
next_front  |     slug: 'hensyu',
next_front  |     body: 'You have to believe',
next_front  |     created_at: '2023-06-28T13:31:14.762Z',
next_front  |     updated_at: '2023-06-28T13:51:40.356Z'
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
next_front  |         id: 3,
next_front  |         title: 'postman naretekita',
next_front  |         description: 'API叩く',
next_front  |         slug: 'postman-naretekita',
next_front  |         body: '苦戦したがCRUD処理はなんとかできるようになってきた',
next_front  |         created_at: '2023-06-28T13:43:48.434Z',
next_front  |         updated_at: '2023-06-28T13:43:48.434Z'
next_front  |       },
next_front  |       {
next_front  |         id: 1,
next_front  |         title: 'hensyu',
next_front  |         description: 'Ever wonder how?',
next_front  |         slug: 'hensyu',
next_front  |         body: 'You have to believe',
next_front  |         created_at: '2023-06-28T13:31:14.762Z',
next_front  |         updated_at: '2023-06-28T13:51:40.356Z'
next_front  |       }
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
