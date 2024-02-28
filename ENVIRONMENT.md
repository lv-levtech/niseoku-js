# ローカル環境

各開発者にお任せします。
`npm run test`が実行できるところまでは確認してください。

# Docker環境（VS Code & Dev Containers）

1. 拡張機能から`@id:ms-vscode-remote.remote-containers`で検索しインストール
2. コマンドパレットもしくは左下の`><`ボタンから`コンテナーで再度開く`を選択
3. コンテナー上のターミナルから`npm install`を実行
4. コンテナー上のターミナルから`npm run test`を実行

## git設定

1. `ssh-keygen -t ed25519 -C "your_email@leverages.jp"`で新しい SSH キーを生成
2. `touch ~/.ssh/config`でconfigファイルを作成
3. `code ~/.ssh/config`でファイルを開き、以下を設定
```
Host github.com
  HostName github.com
  IdentityFile ~/.ssh/id_ed25519
  User git
```
4. GitHub で自分のアカウントに SSH 公開キーを追加します。[GitHub アカウントへの新しい SSH キーの追加](https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)を参照してください。
5. `ssh github.com`を実行して、以下の結果となれば問題なし。
```
PTY allocation request failed on channel 0
Hi xxxxxxxx-lvgs! You've successfully authenticated, but GitHub does not provide shell access.
Connection to github.com closed.
```