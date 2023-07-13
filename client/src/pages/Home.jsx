import React, { useState } from 'react';
import axios from '@/api/axios.js';

const Home = () => {
    const [images, setImages] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [tag, setTag] = useState('');

    function testAPI() {
        axios.get('/api/images/all', { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                const count = res?.data?.count;
                console.log(count);

                const imgArr = [];
                for (let i = 0; i < 10; i++) {
                    imgArr.push(res?.data?.images[i]?.imageURL);
                }
                setImages(() => [...imgArr]);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function testAPImulti(tag) {
        axios.get(`/api/images/${tag}`, { headers: { 'Content-Type': 'application/json' } })
            .then(res => {
                const count = res?.data?.count;
                console.log(count);

                const imgArr = [];
                for (let i = 0; i < res?.data?.count; i++) {
                    imgArr.push(res?.data?.images[i]?.imageURL);
                }
                setLoaded(true);
                setImages(() => [...imgArr]);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function LoadImages() {
        return images.map((img, i) => {
            return <img src={img} alt={`img-${i}`} key={i} width={1000} />;
        });
    }

    return (
        <React.Fragment>
            <h1>API Test</h1>
            <form>
                <label>
                    Give Tag:
                    <input type='text' value={tag} onChange={(e) => { setTag(e.target.value) }} />
                </label>
            </form>
            <button onClick={testAPI}>Test here.</button>
            <button onClick={() => testAPImulti(tag)}>Test here too.</button>
            {loaded && <LoadImages />}
        </React.Fragment>
    );
}

export default Home;