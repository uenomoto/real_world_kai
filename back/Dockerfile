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

# アプリケーションディレクトリ
ENV APP_HOME /real_world_api
WORKDIR $APP_HOME

# Gemfileを追加する
ADD Gemfile $APP_HOME/Gemfile
ADD Gemfile.lock $APP_HOME/Gemfile.lock

# アプリケーションのコードを追加する
ADD . $APP_HOME

RUN bundle install

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
# 本番の時のエントリーポイントを本番用にECSのタスク作成で設定する
ENTRYPOINT ["entrypoint.sh"]

# 開発環境用↓
CMD ["rails", "server", "-b", "0.0.0.0", "-e", "development"]

# 本番環境の初期コマンドはECSのタスク作成で設定する
