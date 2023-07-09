import { useState } from 'react'
import axios from '../../api/axios.js';
import './App.css'

const App = () => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const testAPI = () => {
    axios.get('/api/images/all', { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        const count = res?.data?.count;
        setLoaded(true);
        console.log(count);
        const imgArr = []
        for (let i = 0; i < 10; i++) {
          imgArr.push(res?.data?.images[i]?.imageURL)
        }
        setImages(imgArr);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const LoadImages = () => {
    if (loaded) {
      return (
        images.map((img, i) => {
          return <img src={img} alt={`img-${i}`} key={i} />
        })
      );
    } else {
      return <h2>Cant load images</h2>
    }
  };

  return (
    <div>
      <h1>API Test</h1>
      <button onClick={testAPI}>Test here.</button>
      {loaded && <LoadImages/>}
    </div>
  )
};

export default App;
