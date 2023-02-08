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
              <div style={{display: 'flex', flex: 1, flexDirection: 'column', height: '100%'}}>
                <HeaderBar />
                <main className="content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/prospect" element={<Prospects />} />
                  </Routes>
                </main>
              </div>

            </div>
        </BrowserRouter>
    </ApolloProvider>
  );
}

