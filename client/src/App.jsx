import { useState } from 'react'
import axios from '../../api/axios.js';
import './App.css'

const App = () => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tag, setTag] = useState('');

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

  const testAPImulti = (tag) => {
    axios.get(`/api/images/${tag}`, { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        const count = res?.data?.count;
        setLoaded(true);
        console.log(count);

        const imgArr = []
        for (let i = 0; i < res?.data?.count; i++) {
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
      console.log(images);
      return images.map((img, i) => {
        return <img src={img} alt={`img-${i}`} key={i} width={1000} />
      });
    } else {
      return <h2>Cant load images</h2>
    }
  };

  const handleTag = (e) => {
    setTag(e.target.value);
  };

  return (
    <div>
      <h1>API Test</h1>
      <form>
        <label>
          Give Tag:
          <input type='text' value={tag} onChange={handleTag} />
        </label>
      </form>
      <button onClick={testAPI}>Test here.</button>
      <button onClick={() => testAPImulti(tag)}>Test here too.</button>
      {loaded && <LoadImages />}
    </div>
  )
};

export default App;
