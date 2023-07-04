## real_wolrd で API の叩き方を復習

https://workoutkeep.com/api/v1/health_check

ALBのヘルスチェックで必ず200okにしなくてはならないため専用のcontrollerとrouteを作成してエラー回避

### Rails側

一覧取得

https://workoutkeep.com/api/v1

詳細取得

https://workoutkeep.com/api/v1/articles/isr-is-got

クリエイト

POST /api/v1/articles

編集

PUT /api/v1/articles/:slug

削除

DELETE /api/v1/articles/:slug

### Next.js側

新規投稿

https://pf-workoutmenu.com/articles/new

一覧取得

https://pf-workoutmenu.com

詳細取得

https://pf-workoutmenu.com/artcles/isr-is-got

編集画面

https://pf-workoutmenu.com/artcles/edit/isr-is-got

### 現時点でのインフラ構成図

![AWSアーキテクチャ図](https://github.com/uenomoto/real_world_kai/assets/113354283/7514a9f2-471f-44c5-99cd-6a8385eed530)



本当は nginx がいると思いますが僕にはまだ早かった学習不足です

それと DB のマルチ AZ はコストすごく高いのであえてシングル AZ です。

AZ はわけないと RDS のインスタンスが作成できないため空の privatesubnet があります。

CI/CD はこれからやります。オリプロでは絶対取り入れたいので！！
