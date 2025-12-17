import img1 from '../assets/Fotos/1.jpg';
import img2 from '../assets/Fotos/2.jpg';
import img3 from '../assets/Fotos/3.jpg';
import img4 from '../assets/Fotos/4.jpg';
import img5 from '../assets/Fotos/5.jpg';
import img6 from '../assets/Fotos/6.jpg';
import img7 from '../assets/Fotos/7.jpg';
import img8 from '../assets/Fotos/8.jpg';
import img9 from '../assets/Fotos/9.jpg';
import img10 from '../assets/Fotos/10.jpg';
import img11 from '../assets/Fotos/11.jpg';
import img12 from '../assets/Fotos/12.jpg';
import img13 from '../assets/Fotos/13.jpg';
import img14 from '../assets/Fotos/14.jpg';
import img15 from '../assets/Fotos/15.jpg';
import img16 from '../assets/Fotos/16.jpg';
import img17 from '../assets/Fotos/17.jpg';
import img18 from '../assets/Fotos/18.jpg';
import img19 from '../assets/Fotos/19.jpg';
import img20 from '../assets/Fotos/20.jpg';



export const animalImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20];


export function getRandomImage(): string {
  const index = Math.floor(Math.random() * animalImages.length);
  return animalImages[index];
}