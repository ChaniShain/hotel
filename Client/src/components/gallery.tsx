


import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import '../App.css'
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import img4 from '../assets/images/img4.jpg';
import img5 from '../assets/images/img5.jpg';
import img6 from '../assets/images/img6.jpg';
import img7 from '../assets/images/img7.jpg';
import img8 from '../assets/images/img8.jpg';
import img9 from '../assets/images/img9.jpg';
import img10 from '../assets/images/img10.jpg';
import img11 from '../assets/images/img11.jpg';

const itemData = [
  {
    img: img1,
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: img2,
    title: 'Burger',
  },
  {
    img: img3,
    title: 'Breakfast',


  },
  {
    img: img4,
    title: 'Burger', rows: 2,
    cols: 2,
  },

  {
    img: img8,
    title: 'Honey',

  },
  {
    img: img5,
    title: 'Camera',
  },
  {
    img: img6,
    title: 'Coffee',
    cols: 2,
    rows: 1,
  },
  {
    img: img7,
    title: 'Hats',
    cols: 2,
  }, {
    img: img9,
    title: 'Hats',
    cols: 2,
    rows: 2
  }, 
  {
    img: img11,
    title: 'Hats',
    cols: 1,
    rows: 2
  },
  {
    img: img10,
    title: 'Hats',
    cols: 1,
    rows: 2
  },

];

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const Gallery = () => {
  return (

    <ImageList className="background"
    
      variant="quilted"
      cols={4}
      rowHeight={200}
      sx={{ padding: '4px' }}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
          sx={{ padding: '9px' }} 
        >
          <img
            {...srcset(item.img, 200, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
