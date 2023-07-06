# まみむ memo

```ruby
def to_json
    {
      **as_json(except: %i[created_at updated_at]),
      createAt: created_at.strftime('%d/%m/%Y %H:%M:%S'),
      updateAt: updated_at.strftime('%d/%m/%Y %H:%M:%S'),
    }
  end
```

記事の投稿時間と更新時間を結果の json に含まれないそして createAt と updateAt というキーで追加され整形される

## 2 つの表現は生成する JSON データの構造に違い

### render json: { article: @article.to_json }

```ruby
{
  "article": {
    # @articleの属性がここに入る
  }
}
```

クライアントは article キーを通じてデータにアクセスする

### render json: @article.to_json

```ruby
{
  # @articleの属性がここに入る
}
```

この場合、クライアントはデータに直接アクセスできる

自動デプロイに挑戦
ポリシーアタッチ
ユーザーにポリシー
