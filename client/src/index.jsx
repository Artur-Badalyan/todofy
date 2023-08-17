import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from 'notistack';

import store from "./store/index";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<SnackbarProvider
				hideIconVariant
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
			>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</SnackbarProvider>
		</Provider>
  	</React.StrictMode>
  );
