import doctorsData from "../db/doctorsDB";
import doctorsFilter from "./doctorsFilter";
import { doctorsFilterMetro } from "./doctorsFilter";
import { doctorsFilterSpec } from "./doctorsFilter";

let doctorsAll = doctorsData;


const searchWrapperResult = document.querySelector('.search__wrapper-result');



const doctors = () => {

    const radioBtn1 = document.querySelector('#radio_1');
        if(radioBtn1 !== null) {
            radioBtn1.checked = true;
        }

    //отрисовка всех карточек врачей на странице
    doctorsAll.forEach((doctor) => {

        let cardDoctorMetro = document.createElement('div');
        cardDoctorMetro.classList.add('card-doctor__metro');
        
        let cardDoctor = document.createElement('div');
        cardDoctor.classList.add('card-doctor');
        cardDoctor.innerHTML = `
            <div class="card-doctor__photo"><img src=${doctor.photo} alt=""></div>
            <div class="card-doctor__specialty" data-children="${doctor.child}">Врач ${doctor.specialty}</div>
            <div class="card-doctor__name">${doctor.name}</div>
            <div class="card-doctor__price">стоимость приема  от ${doctor.cost} руб</div>
            <div class="card-doctor__clinics">Клиники:</div>
            <div></div>
            <div class="btn card-doctor__btn" href="forma-card.html">Расписание</div>
            
        `;

        searchWrapperResult.append(cardDoctor);
        
       
        doctor.listClinic.forEach(elem => {
            let item = document.createElement('div');
            item.classList.add('card-doctor__metro');
            item.innerHTML = `Метро ${elem.clinic}`;

            let card = cardDoctor.querySelector('.card-doctor__clinics');
            let quantityItem = cardDoctor.querySelectorAll('.card-doctor__metro').length;

            if(quantityItem <= 2){
                card.after(item);
            } else {
                if(quantityItem == 3){
                    let el = cardDoctor.querySelector('.card-doctor__btn');
                    item.innerHTML = `Метро .....`;
                    el.before(item);
                   
                } 
            }
        });  
    });

    
    const toggleFilter = document.querySelectorAll('.radio input');

    toggleFilter.forEach(btn => {
        btn.addEventListener('click', (e) => {
            
            if (e.target.id == 'radio_2'){
                let element = document.querySelectorAll('[data-children="false"]');
               
               element.forEach(elm => {
                   
                    if(elm.offsetParent !== null){
                        elm.offsetParent.style.display = 'none';
                    }
               });
            } else {
                document.querySelectorAll('.card-doctor').forEach(elm => {
                    elm.style.display = '';
                });
            }

            
        });
    });

    
    const cardDoctorBtn = document.querySelectorAll('.card-doctor__btn');
    cardDoctorBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let nameDoctor = e.target.parentElement.children[2].textContent;
           
            window.localStorage.setItem('nameDoctor', nameDoctor);
            window.location.href='forma-card.html';
        });
    });
   
    
}; 



//поиск по имени
const searchFilterBtn  = document.querySelector('.search__filter-btn');

if(searchFilterBtn !== null) {
    searchFilterBtn.addEventListener('click', () => {

        document.querySelectorAll('.card-doctor').forEach(elem => elem.remove());
        let z = doctorsFilter();
        let elem = document.querySelector('.search__no-result')
        if(z.length == 0) {
            
            elem.textContent = 'По вашему запросу ничего не найдено.';
        } else {
            elem.textContent = '';
        }
    
        doctorsAll = z;
        doctors();
    });
}


//поиск по клинике
let requestMetro = document.querySelector("[name=clinics]");

if (requestMetro !== null) {
 requestMetro.addEventListener('change', () => {
     document.querySelectorAll('.card-doctor').forEach(elem => elem.remove());
     doctorsAll = [];
     
     let cvb = doctorsFilterMetro(requestMetro.value);
     doctorsAll = cvb;
     doctors();
     
     requestMetro.value = 'Все клиники';
 });
}


//поиск по специальности
let requestSpec = document.querySelector("[name=specialty]");

if(requestSpec !== null) {
    requestSpec.addEventListener('change', () => {
        
        showSelectionSpecialist(requestSpec.value);
    }); 
}



//вешаем событие клик на специалистов на главное странице
const listSpecialistsOnMain = document.querySelectorAll('.choose-spec__title a');

let itemByClick;

//повесили события
listSpecialistsOnMain.forEach(item => {
    item.addEventListener('click', (e) => {
       
        window.location.href = 'doctors.html';

        let text = e.target.innerText.replace('Дет. ', '');
        
        window.localStorage.setItem('spec', text.charAt(0).toUpperCase() + text.slice(1));
    });
});


if(!window.localStorage.getItem('spec') == ''){
    

    document.querySelectorAll('.card-doctor').forEach(elem => elem.remove());
    doctorsAll = [];
    
    let rgt = doctorsFilterSpec(window.localStorage.getItem('spec'));
    doctorsAll = rgt;
    
    requestSpec.value = 'Все специализации';

    window.localStorage.setItem('spec', '');
}


//показывает врачей по выбранной специальности
function showSelectionSpecialist(spec){
   
      document.querySelectorAll('.card-doctor').forEach(elem => elem.remove());
            doctorsAll = [];
           
            let rgt = doctorsFilterSpec(spec);
            doctorsAll = rgt;
           
            doctors();
           
            requestSpec.value = 'Все специализации';
}


export default doctors;


