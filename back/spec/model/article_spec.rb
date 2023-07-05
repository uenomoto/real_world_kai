# モデルのテストを書く
require 'rails_helper'

RSpec.describe Article, type: :model do
  describe 'バリデーション' do
    # タイトル、本文、デスクリプションがあれば有効な状態であること
    it { should validate_presence_of(:title) }
    it { should validate_uniqueness_of(:title) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:body) }
    it { should validate_uniqueness_of(:slug)}

    context 'タイトルが日本語の時' do
      let(:article) { build(:article, title: 'あ') }

      it '無効であること' do
        expect(article).to be_invalid
        expect(article.errors[:title]).to include('日本語は禁止です')
      end
    end

    context 'タイトルが英語の時' do
      let(:article) { build(:article, title: 'a') }

      it '有効であること' do
        expect(article).to be_valid
      end
    end
  end

  describe 'to_jsonメソッドがしっかりできているか' do
    let(:article) { create(:article) }
    let(:json) { aritcle.to_json }

    it 'created_atとupdated_atを含まないこと' do
      expect(json).not_to have_key('created_at')
      expect(json).not_to have_key('updated_at')
    end

    it 'フォーマットされた日付とreatedAtとupdatedAtであること' do
      expect(json['createdAt']).to eq(article.created_at.strftime('%Y/%m/%d %H:%M:%S'))
      expect(json['updatedAt']).to eq(article.updated_at.strftime('%Y/%m/%d %H:%M:%S'))
    end
  end

  describe 'スラッグがしっかりタイトルから変換されていること' do
    context 'タイトルが存在するとき' do
      let(:article) { build(:article, title: 'my article') }

      it 'スラッグがセットされること' do
        article.save
        expect(article.slug).to eq('my-article')
      end
    end

    context 'タイトルが存在しないとき' do
      let(:article) { build(:article, title: nil) }

      it 'スラッグがセットされないこと' do
        article.save
        expect(article.slug).to eq(nil)
      end
    end
  end
end
