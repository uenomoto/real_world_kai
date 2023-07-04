import "@/styles/globals.css";
import type { AppProps } from "next/app";
// React-toastifyのインポート
// @ts-ignore
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {/* <ToastContainer
        position="top-center" // 通知の表示位置
        autoClose={5000} // 設定した時間（ms）経過後に通知をクローズさせる
        hideProgressBar={false} // 通知のProgress Barの非表示設定をOFF
        newestOnTop // 最新の通知をTOPに表示させる
        closeOnClick // 通知をクリックで閉じれる
        rtl={false} // 通知の文字を左寄せにする
        pauseOnFocusLoss // ウィンドウがフォーカスを失った時に通知の時間経過を一時停止
        draggable={false} // 通知をドラッグできないようにする
        pauseOnHover // 通知にカーソルを当てると時間経過を一時停止
        theme="colored" // テーマ「coloered」を使用する
      /> */}
    </>
  );
}
