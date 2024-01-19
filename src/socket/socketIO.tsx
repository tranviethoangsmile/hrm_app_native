import io from 'socket.io-client';

const URL = 'http://192.168.0.101:4000';
const socket = io(URL);
socket.on('connect', () => {
  console.log('Connected to server');
  // Gửi và nhận các thông điệp từ máy chủ
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
});
export default socket;
