const specialistsToggle = () => {

    const toggleWrapper = document.querySelector('.toggle__wrapper');
    const toggleSubtitleLeft = document.querySelector('.toggle__subtitle-left');
    const toggleSubtitleRight = document.querySelector('.toggle__subtitle-right');


    toggleWrapper.addEventListener('click', () => {
        
        let elm = document.querySelector('.switch-btn');
        let wrapper = document.querySelectorAll('.choose-spec__wrapper');

        if(!toggleSubtitleRight) {
            return;
        }
        toggleSubtitleRight.classList.toggle('toggle__subtitle_activ');
        toggleSubtitleLeft.classList.toggle('toggle__subtitle_activ');
        
        if(elm.classList.contains('move-right')){
            elm.classList.remove('move-right');
            wrapper[0].style.display = 'flex';
            wrapper[1].style.display = 'none';

        } else {
            elm.classList.add('move-right');
            wrapper[0].style.display = 'none';
            wrapper[1].style.display = 'flex';
        };
    });
}; 


export default specialistsToggle;















