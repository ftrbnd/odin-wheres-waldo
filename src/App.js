import { Link } from "react-router-dom";
import styles from './styles/App.module.css';

function App() {
  const images = [
    { link: 'https://i.imgur.com/9AV8Pm5.jpg', name: 'Central Park' },
    { link: 'https://i.imgur.com/GcajWP8.jpg', name: 'Green Goblin' },
    { link: 'https://i.imgur.com/2TYdu9B.jpg', name: 'Mister Negative' },
    { link: 'https://i.imgur.com/F0yqph0.jpg', name: 'Vulture'}
  ];

  return (
    <div className={styles.App}>
      <h2>Choose an image to get started!</h2>
      {images.map(img => 
        <div key={img.name} className={styles.card}>
          <Link to='/game' state={{ image: img }}>
            <img src={img.link} alt={img.name} />
            <p>{ img.name }</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default App;