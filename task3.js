$(document).ready(function() {
    let currentIndex = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;

    $('.next').click(function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlidePosition();
    });

    $('.prev').click(function() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    });

    function updateSlidePosition() {
        const newTransform = -currentIndex * 100 + '%';
        $('.slides').css('transform', 'translateX(' + newTransform + ')');
    }
});
