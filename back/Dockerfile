# Base Image
FROM ruby:3.2.0

# 必要なライブラリをインストール
RUN apt-get update -qq && apt-get install -y build-essential \
  libpq-dev \
  postgresql-client \
  tzdata \
  vim

# Set timezone
ENV TZ=Asia/Tokyo

# 開発環境の場合はコメントアウトする↓
ENV RAILS_ENV=production

# アプリケーションディレクトリ
ENV APP_HOME /real_world_api
WORKDIR $APP_HOME

# Gemfileを追加する
ADD Gemfile $APP_HOME/Gemfile
ADD Gemfile.lock $APP_HOME/Gemfile.lock

# bundle install
RUN bundle install

# アプリケーションのコードを追加する
ADD . $APP_HOME

# エントリーポイントをコピー(開発環境用)
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# 本番環境↓
CMD ["rails", "server", "-b", "0.0.0.0", "-e", "production"]
# 開発環境用↓
# CMD ["rails", "server", "-b", "0.0.0.0", "-e", "development"]

# 本当は開発用と本番用でDockerfileを分けた方がいい気がするごちゃごちゃになるので一旦落ち着いたら分けれるか調べること
