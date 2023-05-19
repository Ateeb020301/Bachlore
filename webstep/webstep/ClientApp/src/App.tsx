import React, { useContext, useEffect, useMemo, useState } from "react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Route, Routes, useLocation } from "react-router-dom";
import { HeaderBar } from "./page/navbar/header";
import { Home } from "./page/home/home";
import { Prospects } from "./page/prospect/Prospects";
import { Contracts } from "./page/contracts/contracts";
import { Seller } from "./page/seller/seller";
import { Consultant } from "./page/consultant/consultant";
import { Profile } from "./page/consultant/extended/consultantprofile";
import { Deals } from "./page/deals/deals";
import { Customers } from "./page/customer/customer";
import { Navbar } from "./page/navbar/navbar";
import isAuthenticated from "./utils/auth_check";
import { ErroePage } from "./page/404/404";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = new ApolloClient({
  uri: document.baseURI + "graphql",
  cache: new InMemoryCache({ addTypename: false }),
});

export const App: React.FC = () => {
  const location = useLocation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // execute on location change
    setCount(count + 1);
  }, [location]);

  return (
    <GoogleOAuthProvider clientId="79575982650-ke51dobd50k5nkf3n1gf91njdltp6ocl.apps.googleusercontent.com">
      <ApolloProvider client={client}>
        <div className="app">
          <div style={{ display: "flex" }}>
            <Navbar res={localStorage.getItem("response")} />
          </div>
          <main className="content" style={{ width: "100%" }}>
            <HeaderBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path={"/prospect"}
                element={isAuthenticated() ? <Prospects /> : <ErroePage />}
              />
              <Route
                path="/belegg/*"
                element={isAuthenticated() ? <Contracts /> : <ErroePage />}
              />
              <Route
                path="/deals"
                element={isAuthenticated() ? <Deals /> : <ErroePage />}
              />
              <Route
                path="/seller/*"
                element={isAuthenticated() ? <Seller /> : <ErroePage />}
              />
              <Route
                path="/consultant"
                element={isAuthenticated() ? <Consultant /> : <ErroePage />}
              />
              <Route
                path="/customer"
                element={isAuthenticated() ? <Customers /> : <ErroePage />}
              />
              <Route
                path="/profile/:id"
                element={isAuthenticated() ? <Profile /> : <ErroePage />}
              />
            </Routes>
          </main>
        </div>
      </ApolloProvider>
    </GoogleOAuthProvider>
  );
};
