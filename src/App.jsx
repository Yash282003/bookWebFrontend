import React from "react";
import Home from "./pages/Home";
import ContextProvider from "./context/ContextProvider";

function App() {
  return (
    <div>
    <ContextProvider>
    <Home />
    </ContextProvider>
      
    </div>
  );
}

export default App;
