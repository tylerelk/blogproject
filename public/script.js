const expandArrow = document.querySelector('.expand-icon');
const postArea = document.querySelector('nav');

expandArrow.addEventListener('click', () => {
    if (postArea.style.transform === 'scaleY(0)'){
        postArea.style.transform = 'scaleY(1)';
        postArea.style.position = 'static'
        expandArrow.style.transform = 'rotate(180deg)';
    } else {
        postArea.style.transform = 'scaleY(0)';
        postArea.style.position = 'absolute';
        expandArrow.style.transform = 'rotate(0deg)';
    }
});