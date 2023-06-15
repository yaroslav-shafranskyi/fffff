// import { AppRegistry } from 'react-native';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App'
import './index.css'

// AppRegistry.registerComponent("App", () => App);

// AppRegistry.runApplication("App", {
//   rootTag: document.getElementById("root")
// });

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as HTMLElement);
root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
