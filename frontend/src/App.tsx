import React from "react";
import { Footer } from "./components/Footer";
import { AppRouter } from "./router";

const App = () => {
  return (
    <>
      <AppRouter />
      <Footer />
    </>
  );
};

export default App;
