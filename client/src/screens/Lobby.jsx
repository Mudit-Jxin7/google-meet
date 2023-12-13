import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const navigate = useNavigate();
  const socket = useSocket();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit('room:join' , {
        email , room
      })
      setEmail("");
      setRoom("");
    },
    [email, room , socket]
  );

  const handleJoinRoom = useCallback((data) => {
    const {email , room} = data;
    navigate(`/room/${room}`);
  } , [])

  useEffect(() => {
    socket.on('room:join' , handleJoinRoom);
    return () => {
      socket.off('room:join' , handleJoinRoom);
    }
  } , [socket , handleJoinRoom]);
  

  return (
    <div style={{ textAlign: 'center', maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
  <h1 style={{ color: '#333', fontFamily: 'Arial, sans-serif' }}>Lobby</h1>
  <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <label htmlFor="email" style={{ marginBottom: '8px', color: '#555', fontFamily: 'Arial, sans-serif' }}>Email ID</label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={{ padding: '8px', marginBottom: '16px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
    />
    <label htmlFor="room" style={{ marginBottom: '8px', color: '#555', fontFamily: 'Arial, sans-serif' }}>Room Number</label>
    <input
      type="text"
      id="room"
      value={room}
      onChange={(e) => setRoom(e.target.value)}
      style={{ padding: '8px', marginBottom: '24px', width: '100%', borderRadius: '4px', border: '1px solid #ccc' }}
    />
    <button
      style={{
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      Join
    </button>
  </form>
</div>

  );
};

export default Lobby;