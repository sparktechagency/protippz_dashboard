/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { url } from '../Utils/BaseUrl';
import { jwtDecode } from 'jwt-decode';
const SocketContext = createContext({
  socket: null,
  onlineUser: [],
});

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const decoded = jwtDecode(token);

    const socketConnection = io(`${url}`, {
      // auth: {
      //   token: token,
      // },
      query: {
        id: decoded.id,
      },
    });

    socketConnection.on('onlineUser', (data) => {
      setOnlineUser(data);
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
