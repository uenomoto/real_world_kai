class Article < ApplicationRecord
  before_save :set_slug

  validates :title, presence: true, uniqueness: true
  validates :description, presence: true
  validates :slug, uniqueness: true
  validates :body, presence: true
  validate :validate_not_japan_title

  #　記事の投稿時間と更新時間を結果のjsonに含まれないそしてcreateAtとupdateAtというキーで追加され整形される
  def to_json
    {
      **as_json({ except: %i[created_at updated_at] }),
      createAt: created_at.strftime('%d/%m/%Y %H:%M:%S'),
      updateAt: updated_at.strftime('%d/%m/%Y %H:%M:%S'),
    }
  end

  def validate_not_japan_title
    return unless title.present? && title.match?(/^[ぁ-んァ-ン一-龥]/)

    errors.add(:title, '日本語は禁止です')
  end

  scope :leatest, -> { order(created_at: :desc)}

  private

  # parameterizeメソッドは'My Article' これが　'my-article'になる
  def set_slug
    self.slug = title.parameterize if title && !title.empty? 
  end
end
