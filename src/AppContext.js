import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [trackId, setTrackId] = useState(null);

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken, trackId, setTrackId }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
