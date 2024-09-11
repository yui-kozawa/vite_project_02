import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

/* Splide 参考
https://ja.splidejs.com/guides/getting-started/
*/


// let splide = new Splide( '.splide', {
//     type   : 'loop',
//     padding: '5rem',
//   } );
  
//   splide.mount();

var splide = new Splide( '.splide', {
    type   : 'loop',
    perPage: 3,
    focus  : 'center',
  } );
  
  splide.mount();
