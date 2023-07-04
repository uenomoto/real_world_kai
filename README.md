## real_wolrd で API の叩き方を復習

https://workoutkeep.com/api/v1/health_check

ALBのヘルスチェックで必ず200okにしなくてはならないため専用のcontrollerとrouteを作成してエラー回避

一覧取得

https://workoutkeep.com/api/v1

### 現時点でのインフラ構成図

![AWSアーキテクチャ図](https://github.com/uenomoto/real_world_kai/assets/113354283/c1ab4dae-b3b6-4f75-a71d-4e2dab0519e5)


本当は nginx がいると思いますが僕にはまだ早かった学習不足です

それと DB のマルチ AZ はコストすごく高いのであえてシングル AZ です。

AZ はわけないと RDS のインスタンスが作成できないため空の privatesubnet があります。

CI/CD はこれからやります。オリプロでは絶対取り入れたいので！！
