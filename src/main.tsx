import "./index.css";
import "@mantine/charts/styles.css";
import "@mantine/core/styles.css";
// import "mantine-datatable/styles.layer.css";

import App from "./App";
import { store } from "../src/redux/store";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
  white: "#f6f9fc",
});

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <MantineProvider theme={theme} forceColorScheme="light">
        <App />
      </MantineProvider>
    </Provider>
  );
}
