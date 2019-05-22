import controller from '@squarespace/controller';

import GalleryStrip from './controllers/GalleryStrip';

controller.register('GalleryStrip', GalleryStrip);

window.addEventListener('DOMContentLoaded', () => {
  const galleryStrips = document.querySelectorAll('.sqs-gallery.sqs-gallery-design-strip')
  Array.from(galleryStrips).forEach(element => {
    element.setAttribute('data-controller', 'GalleryStrip')
    GalleryStrip(element)
  })
})
