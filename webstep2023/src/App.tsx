import React from 'react';
import './App.css';
import GuardedRoute from './components/Auth/GuardedRoute';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import isAuthenticated from './utils/auth_check';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HeaderBar } from './page/navbar/header';
import { Navbar } from './page/navbar/navbar';
import { Home } from './page/home/home';

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
              <main className="content">
                  <HeaderBar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                  </Routes>
                </main>
            </div>
        </BrowserRouter>
    </ApolloProvider>
  );
}

