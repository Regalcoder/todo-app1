import axios from 'axios'; // Fixed import syntax

// TEST 1: Vanilla JavaScript fetch
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => res.json())
  .then(data => console.log('🟢 VANILLA FETCH:', data))
  .catch(err => console.error('🔴 VANILLA ERROR:', err));

// TEST 2: Direct Axios call

axios.get('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => console.log('🟢 AXIOS:', res.data))
  .catch(err => console.error('🔴 AXIOS ERROR:', err));