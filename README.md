# niseoku-js


## 目的

TDD、DDD、リファクタリング、デザインパターンなどの実践を通して、ソフトウェア開発の基礎的なスキルを身につけることを目的とします。

## 内容

オークションのドメインモデルを設計・実装することで、以下を学びます。

- モブプログラミング
    - モブプログラミングは、チーム内の知識共有と協調作業を促進し、組織全体の問題解決能力の向上に役立ちます
- テスト駆動開発(TDD)
    - テスト駆動開発（TDD）は、堅牢で簡潔なコード設計を促進し、ソフトウェア開発の効率と品質向上に貢献します
- ドメイン駆動設計(DDD)
    - ドメイン駆動設計（DDD）は、問題領域の複雑さをモデル化し、システム設計と要件の整合性を高めることで、ソフトウェア開発の価値と効率に貢献します
- リファクタリング
    - リファクタリングは、コードの可読性と保守性を向上させ、将来的な開発の効率化に役立ちます
- デザインパターン
    - デザインパターンは、再利用可能なソフトウェア設計の構造を提供し、開発の複雑さを管理しやすくすることに貢献します

## 前提

- 複雑な作業はほぼありません。すべてリモートでのモブプログラミングになります
    - モブプログラミングは、複数の開発メンバーがあつまり、同じコンピュータのモニタを見ながら、話し合いながらソフトウェア開発を進める手法です
- テスト駆動開発のスタイルに沿って実装していただきます
    - コードを書くにはまずテストを書いてもらいます(テストファースト)
- HTTPやDBに関する実装は行いません。ドメイン部分(ビジネスロジック)の課題のみです
- 対象ドメインは、かなり簡易的なオークションになります
    - 主な概念はユーザアカウント、商品、価格、オークションなどです 

## 事前課題

- 以下の環境を事前にセットアップしておいてください
    - Node.js(20.5.0以降)
        - おすすめは [asdf](https://asdf-vm.com/)
        - [Node.jsのプラグイン](https://github.com/asdf-vm/asdf-nodejs) が使えます 
    - VSCode or WebStorm
- 依存関係の解決
```
$ npm install
```
- テストを実行する
```
$ npm run test
```
テストは未実装のものがあるので大半がfailします。
- 事前課題1) ユーザアカウント関連ストーリのテストと実装を確認してください。
    - [user-account.test.ts](src/domain/user-account.test.ts)
    - [user-account-repository.test.ts](src/infrastructure/memory/user-account-repository-in-memory.test.ts)
- 事前課題2) ユーザ認証周りストーリのテストと実装を確認してください
    - [authentication-service.test.ts](src/infrastructure/authentication-service.test.ts)

## プログラム内容

想定のユーザーストーリは[こちら](docs/TODO.md)

- 1日目は、ユーザ認証のストーリをモブプログラミングで実装していきます(2時間)
    - 事前課題の確認
    - 参加者はナビゲーターになり、講師がドライバーで説明する
    - TDDのサイクル(RED,GREEN,REFACTORING)を体験する
    - ディフェクトインサーション
    - 仮実装
    - 三角測量
    - 明白な実装
- 2日目は、オークション関連のストーリをモブプログラミングで実装していきます(2時間)
    - 参加者でチームを構成する。チームごとにブランチを切って作業してもらいます。
    - 1回7分の[モブタイマー](https://mobti.me/)を使って、ドライバ＆ナビゲーターを交互に交代する
    - TDDを実践する
- 3日目は、オークション関連のストーリをモブプログラミングで実装していきます(2時間)
    - 2日目の続きを行う
    - リファクタリング・テクニック
        - 問い合わせと更新の分離(書き込みと読み込みを同時にしない)
- 4日目は、オークション関連のストーリをモブプログラミングで実装していきます(2時間)
    - 3日目の続きとデザインパターンでリファクタリングする
        - Decorator
        - Chain of Reponsibility
