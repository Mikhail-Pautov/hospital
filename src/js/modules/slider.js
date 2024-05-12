const slider = () => {


    try {
        const promoSlider = document.querySelector('.promo__slider');
    const slideWrapper = document.querySelector('.promo__slide-wrapper');
    const slideImg = document.querySelectorAll('.promo__slide-wrapper img');
    const widthContainer = document.querySelector('.container');
   
    
    const mediaQuery = window.matchMedia('(max-width: 1200px)');
    const mediaQuery992 = window.matchMedia('(max-width: 992px)');
    let move = widthContainer.clientWidth; //длина видимой части контейнера


    let width = widthContainer.clientWidth * slideImg.length;
    slideWrapper.style.width = `${width}px`;

    function changeWidth(widthCont){
        let a;
       
        if(widthCont){
            a =  widthContainer.clientWidth * slideImg.length;
            slideWrapper.style.width = `${a}px`;
            width = a;
            move = 0;
        } else {
            a =  widthContainer.clientWidth * slideImg.length;
            slideWrapper.style.width = `${a}px`;
            width = a;
            move = 0;
        }
    }


    mediaQuery.addEventListener('change', () => {
        changeWidth(mediaQuery.matches);
    });


    mediaQuery992.addEventListener('change', () => {
        changeWidth(mediaQuery992.matches);
    });

    
    function slideMove(){
        if(move < width){
            slideWrapper.style.transform = `translateX(-${move}px)`;
            move = move + widthContainer.clientWidth;
        } else {
            move = 0;
        }
    };


    let pause;

    function moveInterval() {
        pause = setInterval(slideMove, 10000);
    }

    moveInterval();

    promoSlider.addEventListener('mouseenter', () => {
        clearInterval(pause); 
    });
    

    promoSlider.addEventListener('mouseout', () => {
        moveInterval();
    });




    } catch (error) {
        
    }
    


} 

export default slider;















