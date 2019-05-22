function GalleryStrip(element) {
  const wrapper = element.querySelector('.sqs-wrapper');

  const scrollPadding = -element.offsetLeft*2 + 40
  let wrapperWidth = 0;
  let lastScrollLeft = 0;

  const enableScroll = () => {
    element.style.overflowX = 'scroll';
  }

  const updateWrapperWidth = () => {
    let lastImg = wrapper.children[wrapper.children.length - 1];
    wrapperWidth = lastImg.offsetLeft - lastImg.offsetWidth;
  }

  const onScroll = (evt) => {
    updateWrapperWidth();
    let maxScroll = wrapperWidth + wrapper.offsetLeft + scrollPadding;
    if (element.scrollLeft > maxScroll) {
      element.scrollLeft = maxScroll - (element.scrollLeft - lastScrollLeft);
    }
    lastScrollLeft = element.scrollLeft;
  }

  enableScroll();
  element.addEventListener('scroll', onScroll);

  return {
    sync: enableScroll
  };
}


export default GalleryStrip;
