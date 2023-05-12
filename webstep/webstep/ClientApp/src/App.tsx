import React from "react";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HeaderBar } from "./page/navbar/header";
import { Home } from "./page/home/home";
import { Prospects } from "./page/prospect/Prospects";
import { Contracts } from "./page/contracts/contracts";
import { Seller } from "./page/seller/seller";
import { Consultant } from "./page/consultant/consultant";
import { Profile } from "./page/consultant/extended/consultantprofile";
import { SellerProfile } from "./page/seller/extended/sellerprofile";
import { Deals } from "./page/deals/deals";
import { Customers } from "./page/customer/customer";
import { Navbar } from "./page/navbar/navbar";

const client = new ApolloClient({
  uri: document.baseURI + "graphql",
  cache: new InMemoryCache({ addTypename: false }),
});

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="app">
          <div style={{ display: "flex" }}>
            <Navbar />
          </div>
          <main className="content" style={{ width: "100%" }}>
            <HeaderBar />
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
      </BrowserRouter>
    </ApolloProvider>
  );
};
