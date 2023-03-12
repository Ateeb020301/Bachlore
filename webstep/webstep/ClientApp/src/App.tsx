import React from 'react';
import './App.css';
import GuardedRoute from './components/Auth/GuardedRoute';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import isAuthenticated from './utils/auth_check';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeaderBar } from './page/navbar/header'; 
import { Navbar } from './page/navbar/navbar';
import { Home } from './page/home/home';
import { Prospects } from './page/prospect/Prospects'
import { setNavCollapse } from './page/navbar/navbar';
import { Contracts } from './page/contracts/contracts';
import { Seller } from './page/seller/Seller';
import { Consultant } from './page/consultant/Consultant';

const client = new ApolloClient({
  uri: document.baseURI + 'graphql',
  cache: new InMemoryCache({ addTypename: false }),
});

export const App: React.FC = () => {
  
  return (
      <ApolloProvider client={client}>
        <BrowserRouter>
            <div className='app'>
              <Navbar />
              <div style={{display: 'flex', flex: 7, flexDirection: 'column', height: '100%'}}>
                <div>
                  <HeaderBar />
                </div>
                <main className="content" style={{height: '100%', overflow: 'auto', maxWidth: '100vw'}}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/prospect" element={<Prospects />} />
                    <Route path="/belegg" element={<Contracts />} />
                    <Route path="/seller/*" element={<Seller />} />
                    <Route path="/consultant" element={<Consultant />} />
                  </Routes>
                </main>
              </div>

            </div>
        </BrowserRouter>
    </ApolloProvider>
  );
}

