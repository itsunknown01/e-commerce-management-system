import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import ModalProvider from "./components/provider/modal-provider.tsx";
import "./index.css";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Toaster />
        <ModalProvider />
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>s
);
