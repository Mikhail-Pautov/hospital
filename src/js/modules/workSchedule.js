import doctorsData from "../db/doctorsDB";
const workSchedule = () => {

    
   
    const name = window.localStorage.getItem('nameDoctor');
    
    let doctorItem;

    doctorsData.forEach(doctor => {
        if(doctor.name == name){
            doctorItem = doctor;    
        }
    })


    const schedulCard = document.querySelector('.schedule__card');

    schedulCard.querySelector('.schedule__card-specialty').textContent = `Врач ${doctorItem.specialty.toLowerCase()}`;
    schedulCard.querySelector('.schedule__card-photo img').setAttribute('src', doctorItem.photo)
    
    schedulCard.querySelector('.schedule__card-name').textContent = doctorItem.name;

    let priceItems = schedulCard.querySelectorAll('.schedule__card-price');
    priceItems[0].textContent = `Первичный прием ${+doctorItem.cost * 1.20} руб.`;
    priceItems[1].textContent = `Повторный прием ${doctorItem.cost} руб.`;
    
    const scheduleLocation = document.querySelector('.schedule__location');
    let scheduleReceptionSubtitle = document.querySelector('.schedule__reception-subtitle');

    doctorItem.listClinic.forEach(clinic => {
        let elm = document.createElement('div');
        elm.classList.add('schedule__location-item');
        elm.innerHTML = `
            <img src="assets//img/metro-logo.svg" alt="">
            <div class="schedule__location-metro ">${clinic.clinic}</div>
        `
        scheduleLocation.append(elm);
        
    });

    
    scheduleReceptionSubtitle.textContent = `Дни приема: клиника "метро ${doctorItem.listClinic[0].clinic}"`;
    
    scheduleLocation.children[0].classList.add('schedule__location_activ');
    
    const scheduleReceptionWrapper = document.querySelector('.schedule__reception-wrapper');

    

    function setTomeJob(metro){

        let weekday = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
                    
            weekday.forEach(item =>{
                        let element = document.createElement('div');
                        element.classList.add('schedule__reception-time');
                
                        doctorItem.listClinic.forEach(address => {
                            if(address.clinic == metro) {
                                address.timeJob.forEach(day => {
                
                                    if(item == day.day) {
                                        element.innerHTML = `
                                        <div><span>${item}</span></div>
                                        <div>с ${day.time[0]}</div>
                                        <div>до ${day.time[day.time.length - 1]}</div>
                                    `;
                                    }
                                    
                                });
                            } 
                        });

                        scheduleReceptionWrapper.append(element);                
            });
    }


    setTomeJob(doctorItem.listClinic[0].clinic);


    scheduleLocation.addEventListener('click', (e) => {

        scheduleReceptionWrapper.innerHTML = '';
        let target = e.target;
        if( target.classList.contains("schedule__location-item") || target.parentElement.classList.contains("schedule__location-item")){
           
            let metroText;
            
            if(target.localName == 'img'){  
                metroText = target.parentElement.innerText;
            } else {
                metroText = target.innerText;
            }

            scheduleReceptionSubtitle.innerText = `Дни приема: клиника "метро ${metroText}"`;

            setTomeJob(metroText);

            let elem = document.querySelectorAll('.schedule__location-item');
            elem.forEach(item => {
                item.classList.remove('schedule__location_activ');  
            });

            if(target.classList == 'schedule__location-item'){
                target.classList.add('schedule__location_activ');
            }
            
            if(target.parentElement.classList == 'schedule__location-item'){
                target.parentElement.classList.add('schedule__location_activ');
            }
        }  
    });
}


export default  workSchedule;