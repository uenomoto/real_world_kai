class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :slug, null: false
      t.text :body, null: false

      t.timestamps
    end
    add_index :articles, :slug, unique: true
    add_index :articles, :title, unique: true
  end
end
