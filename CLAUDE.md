# UNCHAINED FARM v25

## プロジェクト概要

習慣トラッカー × ファーミングRPGのWebアプリ。タスクをこなすとXPやアイテムを獲得し、クリーチャーを育てながら農場を発展させる。

- **公開先:** GitHub Pages（https://unchained-farm.github.io/habit-farming/）
- **リポジトリ:** https://github.com/unchained-farm/habit-farming

## ファイル構成

```
habit-farming/
├── index.html          # アプリ本体（HTML/CSS/JS すべて1ファイル）
├── bg_meadow.jpg       # 背景画像: 草原（通常）
├── bg_meadow_decay.jpg # 背景画像: 草原（荒廃）
├── bg_forest.jpg       # 背景画像: 森（通常）
├── bg_forest_decay.jpg # 背景画像: 森（荒廃）
├── bg_village.jpg      # 背景画像: 村（通常）
├── bg_village_decay.jpg# 背景画像: 村（荒廃）
├── bg_waterfall.jpg    # 背景画像: 滝（通常）
├── bg_waterfall_decay.jpg # 背景画像: 滝（荒廃）
├── cloud_01.png        # 天候演出: 雲1
├── cloud_02.png        # 天候演出: 雲2
├── cloud_03.png        # 天候演出: 雲3
├── rain_overlay.png    # 天候演出: 雨オーバーレイ
├── snow_overlay.png    # 天候演出: 雪オーバーレイ
├── fish_splash.png     # ステージ演出: 魚跳ね（滝ステージ）
├── bgm1.mp3 〜 bgm5.mp3 # BGM
├── serve.ps1           # ローカル開発用静的サーバー（PowerShell）
├── serve.bat           # serve.ps1 の起動バッチ
└── .claude/
    └── launch.json     # Claude Code プレビューサーバー設定
```

## 開発ルール

1. **修正完了後は毎回自動で以下を実行すること:**
   ```
   git add .
   git commit -m "..."
   git push origin main
   ```
   ユーザーに確認を求めず、修正が完了したら即pushまで行う。

2. **モバイル表示を必ず確認すること。**
   - ブレークポイント: `max-width: 860px`
   - シーン高さ: デスクトップ300px / モバイル160px
   - フォントサイズ・ボタンサイズ・吹き出し位置など、スマホでの見切れや崩れがないか確認する。

## 実装済み機能

- 天候エフェクト: 雨・雪・雷をCSS/JSで実装
- 季節エフェクト: 桜（春）・ホタル（夏）・紅葉（秋）・雪（冬）を月で自動切り替え
- 時間帯オーバーレイ: 朝焼け・夕焼け・夜（JST連動）
- 荒廃モード時に季節エフェクトが止まるバグ修正済み
