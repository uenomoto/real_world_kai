## real_wolrd で API の叩き方を復習

https://workoutkeep.com/api/v1/health_check

DB に何も入っていないため取得した article のデータはありませんと 404 がレスポンスで帰ってくる

### 現時点でのインフラ構成図

![AWSアーキテクチャ図](https://github.com/uenomoto/real_world_kai/assets/113354283/2416f4d4-7f3f-4c50-8ecc-b917b6e4f5cc)


本当は nginx がいると思いますが僕にはまだ早かった学習不足です

それと DB のマルチ AZ はコストすごく高いのであえてシングル AZ です。

AZ はわけないと RDS のインスタンスが作成できないため空の privatesubnet があります。

CI/CD はこれからやります。オリプロでは絶対取り入れたいので！！
