# frozen_string_literal: true

# FactoryBotを使ってテストデータを生成する

FactoryBot.define do
  factory :article do
    sequence(:title) { |n| "Title #{n}" } # タイトルを連番で作成これでタイトルが重複しないようになる
    description { 'Description' }
    body { 'Body' }
    created_at { Time.zone.now }
    updated_at { Time.zone.now }
  end
end
