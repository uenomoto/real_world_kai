# frozen_string_literal: true

# FactoryBotを使ってテストデータを生成する
# ここで定義したデータは、テストデータベースに保存され、defaultのデータとして使われるのでnil回避ができる
FactoryBot.define do
  factory :article do
    title { 'test article' }
    description { 'テストだよ' }
    body { 'テストbodyだよ' }
  end
end
