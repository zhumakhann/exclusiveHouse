document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-container', {
        // Optional parameters
        loop: true,
        slidesPerView: 'auto',
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
    });
})