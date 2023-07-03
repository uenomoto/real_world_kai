#!/bin/bash
set -e

# railsのpidファイルが残っている場合削除
rm -f /real_world_api/tmp/pids/server.pid

# メインプロセスの前にデータベースマイグレーションを追加
# bundle exec rails db:create RAILS_ENV=production DB作成は初回だけでいいのでコメントアウト
bundle exec rails db:migrate RAILS_ENV=production

# dockerfileのCMDの引数を実行する
exec "$@"

# bashのインストールパスが異なる環境でも、スクリプトが正しく動作するようenvつける