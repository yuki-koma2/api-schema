# open api の実験とか

lintとかを自由に使えるようになるため、また、色々とバグがあったりするので、
事前に実験して不確定要素を潰しておく。
プロダクションコードを持ってくるわけには行かないので、それっぽいコードを作って実験する用

## setup

```shell
npm install
```

## yamlのlint

```shell
npm run lint
```


### openAPI のlint修正時

`./openapi/.spectral` に追加 

カスタムルールを作成する場合は、 `./openapi/functions` に独自のスクリプト定義しておく。

#### lint の test

lintのカスタムルールのテスト実行

```shell
npm run test:openApi
```

given (JsonPath)で対象を絞り、その対象に適応するルールをJSでかく。
※ JSで対象の抽出もしてしまうとメンテナンス性が落ちるのでgivenを活用して責務を分離する。


## 今後の展望
- Java(SpringBoot) , TS(React) のコード自動生成
- CIへの組み込み
- 自動リリース
- 練習用に作っているプロダクトへの組み込み

## 参考
- [spectral docs](https://docs.stoplight.io/docs/spectral)
- [spotlight](https://stoplight.io/studio)
- [JsonPath](https://goessner.net/articles/JsonPath/)
- [JSONPathの書き方](https://www.npmjs.com/package/jsonpath-plus)