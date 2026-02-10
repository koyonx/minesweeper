# React マインスイーパー

React、TypeScript、Viteで構築されたクラシックなマインスイーパーゲームです。

このプロジェクトは、モダンなウェブ技術を使用して、完全な機能を持つマインスイーパーを開発するために作成されました。複数の難易度、アニメーション、その他ゲームの標準的な機能を備えています。

## ✨ 機能

- **クラシックなゲームプレイ:** セルを開き、地雷に旗を立て、ボードをクリアします。
- **難易度設定:** 「簡単」「普通」「難しい」の3つのモードから、ボードサイズと地雷の数を選択できます。
- **安全な最初のクリック:** 最初にクリックしたセルは、必ず空のマスになります。
- **タイマー:** 最初のクリックからゲームの経過時間を計測します。
- **粉砕アニメーション:** セルが開く際に、ささやかなアニメーションが再生されます。

## 🚀 技術スタック

- **フレームワーク:** [React](https://react.dev/)
- **言語:** [TypeScript](https://www.typescriptlang.org/)
- **ビルドツール:** [Vite](https://vitejs.dev/)
- **スタイリング:** CSS

## ⚙️ 実行方法

このプロジェクトをローカルで実行するには、以下の手順に従ってください。

### 前提条件

- [Node.js](https://nodejs.org/) (LTS版を推奨, 例: 18.x or 20.x)
- [npm](https://www.npmjs.com/) (Node.jsに付属)

### インストールと実行

1.  **リポジトリをクローン (任意):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **依存関係をインストール:**
    ```bash
    npm install
    ```

3.  **開発サーバーを起動:**
    ```bash
    npm run dev
    ```
    アプリケーションは `http://localhost:5173` （または5173が使用中の場合は別のポート）で利用可能になります。

## 📜 利用可能なスクリプト

このプロジェクトディレクトリでは、以下のスクリプトを実行できます。

-   `npm run dev`: 開発モードでアプリを実行します。
-   `npm run build`: 本番用にアプリをビルドします。
-   `npm run lint`: ESLintでソースコードをチェックします。
-   `npm run preview`: ビルドされた本番用アプリをローカルでプレビューします。

---

## English Translation

### React Minesweeper

A classic Minesweeper game built with React, TypeScript, and Vite.

This project was developed to create a fully functional Minesweeper game with modern web technologies. It includes multiple difficulty levels, animations, and other standard features of the game.

### ✨ Features

- **Classic Minesweeper Gameplay:** Reveal cells, flag mines, and clear the board.
- **Difficulty Levels:** Choose between Easy, Medium, and Hard modes with different board sizes and mine counts.
- **Safe First Click:** The first cell you click is always guaranteed to be an empty space.
- **Timer:** Tracks your game time, starting from the first click.
- **Shatter Animation:** A subtle animation plays when a cell is revealed.

### 🚀 Tech Stack

- **Framework:** [React](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** CSS

### ⚙️ Getting Started

To run this project locally, follow these steps:

#### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended, e.g., 18.x or 20.x)
- [npm](https://www.npmjs.com/) (comes with Node.js)

#### Installation & Running

1.  **Clone the repository (optional):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### 📜 Available Scripts

In the project directory, you can run the following scripts:

-   `npm run dev`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm run lint`: Lints the source code using ESLint.
-   `npm run preview`: Serves the production build locally for previewing.
