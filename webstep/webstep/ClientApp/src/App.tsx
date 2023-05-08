import React from "react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HeaderBar } from "./page/navbar/header";
import { Navbar } from "./page/navbar/navbar";
import { Home } from "./page/home/home";
import { Prospects } from "./page/prospect/Prospects";
import { Contracts } from "./page/contracts/contracts";
import { Seller } from "./page/seller/seller";
import { Consultant } from "./page/consultant/consultant";
import { Profile } from "./page/consultant/extended/consultantprofile";
import { SellerProfile } from "./page/seller/extended/sellerprofile";
import { Deals } from "./page/deals/deals";
import { Customers } from "./page/customer/customer";

const client = new ApolloClient({
  uri: document.baseURI + "graphql",
  cache: new InMemoryCache({ addTypename: false }),
});

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <div
            style={{
              display: "flex",
              flex: 7,
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div>
              <HeaderBar />
            </div>
            <main
              className="content"
              style={{ height: "100%", overflow: "auto", maxWidth: "100vw" }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/prospect" element={<Prospects />} />
                <Route path="/belegg/*" element={<Contracts />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/seller/*" element={<Seller />} />
                <Route path="/consultant" element={<Consultant />} />
                <Route path="/customer" element={<Customers />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/sellerprofile/:id" element={<SellerProfile />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
};
