#!/bin/bash
set -e

# railsのpidファイルが残っている場合削除
rm -f /real_world_api/tmp/pids/server.pid

if [ "$RAILS_ENV" = "production" ]; then
  # 本番環境（AWS ECS）への初回デプロイ時に利用
  # 初回デプロイ後にコメントアウト
  bundle exec rails db:create
  bundle exec rails db:migrate
fi
# dockerfileのCMDの引数を実行する
exec "$@"

# bashのインストールパスが異なる環境でも、スクリプトが正しく動作するようenvつける