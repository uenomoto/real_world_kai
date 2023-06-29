class Api::V1::ArticlesController < ApplicationController
  before_action :set_article, only: %i[show update destroy]

  def index
    @articles = Article.leatest
    if @articles.any?
      render json: { articles: @articles.map(&:to_json) }, status: :ok
    else
      render_not_found_response
    end
  end

  def show
    if @article
      render_article
    else
      render_not_found_response
    end
  end

  def create
    @article = Article.new(article_params)
    if @article.save
      render_article(status: :created)
    else
      render_article_errors
    end
  end

  def update
    if @article.update(article_params)
      render_article
    else
      render_article_errors
    end
  end

  def destroy
    @article.destroy
    head :no_content
  end

  private

  def set_article
    @article = Article.find_by(slug: params[:slug])
  end

  def article_params
    params.require(:article).permit(:title, :description, :body)
  end

  def render_not_found_response
    render json: { error: '取得したarticleのデータはありません' }, status: :not_found
  end

  def render_article_errors
    render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
  end

  def render_article(status: :ok)
    render json: { article: @article.to_json }, atatus: :status
  end
end
