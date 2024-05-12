import doctorsData from "../db/doctorsDB";
import { hospitalAddresses } from "../db/hospitalAddressesDB";

const appointment = () => {
    

    const screenWrapper = document.querySelector('.screen__wrapper');
    let arrSpecialty = [];
    let arrSpecialtyChild = [];
    let choice = {
        name: '',
        specialization: '',
        metro: '',
        address: '',
        date: '',
        dateAtr: '',
        time: '',
        patientName: '',
        patientPhone: '',
        children: false
    };

//second-screen str(выбор специалиста)
    doctorsData.forEach(item => {
        
        arrSpecialty.push(item.specialty);
        if(item.child){
            arrSpecialtyChild.push(item.specialty + ' дет.');
        }
    });

    const arrSpecialtySort = [...new Set(arrSpecialty)];
    
    function showSpecialty(arrSpec) {
        arrSpec.forEach(item => {
            let elm = document.createElement('div');
            elm.classList.add('choose-spec__item');
    
            elm.innerHTML = `
                <div class="choose-spec__icon">
                    <img src="assets/img/specialists-icon.svg" alt="">
                </div>
                <div class="choose-spec__title ">${item}</div>
            `
            
            screenWrapper.append(elm);
            
        });

        chooseSpec();
    }

    showSpecialty(arrSpecialtySort.sort());
    

    
    function chooseSpec() {
        const chooseSpecItem = document.querySelectorAll('.choose-spec__title');
        chooseSpecItem.forEach(item => {
            
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.screen__item').forEach(item => {
                    item.removeEventListener('click', addEventByCardMetro);
                });
                let target = e.target;
                
                if(target.textContent.indexOf(' дет.') > 0){
                    choice.children = true;
                } else {
                    choice.children = false;
                }
                choice.specialization = target.textContent.replace(' дет.', '').toLowerCase();
                chooseSpecItem.forEach(el => el.classList.remove('choose-spec__item_active'))
                item.classList.add('choose-spec__item_active');
            });
        });
    }


    const toggleAppointment = document.querySelector('.switch-btn');

    toggleAppointment.addEventListener('click', () => {
        toggleAppointment.classList.toggle('move-right');
        let text = document.querySelectorAll('.screen__toggle-text');
        screenWrapper.innerHTML = '';
        if(toggleAppointment.classList.contains('move-right')){
            text[0].classList.remove('screen__toggle-text-active');
            text[1].classList.add('screen__toggle-text-active');
            showSpecialty(arrSpecialtyChild.sort());
        } else {
            text[0].classList.add('screen__toggle-text-active');
            text[1].classList.remove('screen__toggle-text-active');
            showSpecialty(arrSpecialtySort.sort());
        }
    });

        

//first-screen str(где карточки с адресами)
    const screenWraperFirst = document.querySelector('.appointment__first-scr').children[4];
    
    function showMetro(){
        hospitalAddresses.forEach(item => {
            let elm = document.createElement('div');
            elm.classList.add('screen__item');
    
            elm.innerHTML = `
                
                    <div class="screen__item-metro">
                        <img src="assets//img/metro-logo.svg" alt="">
                        <div class="screen__item-text">${item.metro}</div>
                    </div>
                    <p>Адрес:</p>
                    <div class="screen__item-address">${item.addresses}</div> 
                    <div class="screen__item-phone">+7(499) 658-963-25</div>
               
            `
            screenWraperFirst.append(elm);
        }) 
    }

    showMetro();

    let metroVisible;
    function  metroActive(){
        const arr = [];

        doctorsData.forEach(item => {
        
         let str = choice.specialization;
         
         if(str == item.specialty.toLowerCase()){
             item.listClinic.forEach(metro => {
                arr.push(metro.clinic)
             })
            } 
        });

        const metroJob = [...new Set(arr)];
        
        //показываем только активные карточки с адресами
        metroVisible = metroJob;
        const screenItem = document.querySelectorAll('.screen__item');
        screenItem.forEach(item => {
            item.style = '';
            let element = item.children[0].innerText;
             
            metroJob.forEach(metro => {

                if(metro.toLowerCase() == element.toLowerCase()){
                    item.style.opacity = '1';
                    item.style.cursor = 'pointer';

                    //это событие тоже надо будет удалять
                    item.addEventListener('click', addEventByCardMetro);
                }
             });
        });
        
    }

    //добавляем событие на карточки с метро(которые подходят)
    function addEventByCardMetro() {
        document.querySelectorAll('.screen__item').forEach(el => el.classList.remove('screen__item_activ'));
        this.classList.add('screen__item_activ');
        choice.metro = this.children[0].innerText;;
        choice.address = this.children[2].innerText;
        showResultDoctorName();
    }
   

//third-screen str
    const screenWrapperThird = document.querySelector('.screen__wrapper-third');
    const todayDate = new Date();

    let d = todayDate.getDate();
    let y = todayDate.getFullYear();
    let m = todayDate.getMonth();

    for(let i = 0; i < 14; i++){

        let date = new Date(y, m, d);
        let day = date.toLocaleString("ru-ru",  {weekday: 'short'});
        let month = date.toLocaleString("ru-ru",  {month: 'short'});

        const elem = document.createElement('div');
        elem.classList.add('item', 'screen__item-third')
        elem.innerHTML = `
            <div class="item__month">${month[0].toUpperCase()+month.slice(1)}</div> 
            <div class="item__data">${date.getDate()} ${day}</div>
        `
        elem.dataset.data = date;
        d++;

        screenWrapperThird.append(elem);
    }

    

    const screenChooseNameDoctors = document.querySelector('.screen__choose-name-doctors');

    //добавляет имена доступных докторов на страницу
    function addNameDoctor(doctor) {
        let element = document.createElement('div');
        element.classList.add('screen__name-doctor');
        element.innerHTML = `Врач ${doctor.specialty.toLowerCase()} - <span>${doctor.name}</span>`;

        screenChooseNameDoctors.append(element);
    }

    //одбирает имена докторов по метро и вызывает функцию addNameDoctor()
    function showResultDoctorName() {
        screenChooseNameDoctors.innerHTML = '';
        
        doctorsData.forEach(doctor => {
            let vbf = choice.specialization;
            let metro = choice.metro;
            
            if(vbf == doctor.specialty.toLowerCase()){
                doctor.listClinic.forEach(item => {
                    if(metro == item.clinic){
                        addNameDoctor(doctor); 
                    }
                });
            }
        });

        eventAdd();
    }


    //запускается по клику на карточку с метро уберает стили активности с блоков время 
    //и запускает функцию showTimeDate() 
    function eventAdd() {
        let screenNameDoctor = document.querySelectorAll('.screen__name-doctor');
    
        if(screenNameDoctor.length < 2){
            showTimeDate(screenNameDoctor[0].lastElementChild.innerText);
            choice.name = screenNameDoctor[0].lastChild.innerText;
            screenNameDoctor[0].style.color = 'var(--color-btn)';
        } 

        screenNameDoctor.forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelector('.screen__selection span').innerHTML = '';
                document.querySelectorAll('.item__data').forEach(el => el.parentElement.classList.remove('item_third-active'));
                //убераем события с активных дат по клику на имя
                document.querySelectorAll('.screen__item-third').forEach(item => {
                    item.removeEventListener('click', addEventDate);   
                });

                //убираем все стили активности с блоков время
                document.querySelectorAll('.screen__item-time').forEach(item => {
                    item.removeEventListener('click', addClassActiveByTime);
                    item.style.opacity = '';
                    item.style.cursor = '';
                    item.classList.remove('item__point', 'item_third-active');
                });

                screenNameDoctor.forEach(item => item.style.color = '');
                item.style.color = 'var(--color-btn)';
                choice.name = item.lastElementChild.innerText
                showTimeDate(item.lastElementChild.innerText);
            });
        });
        
        
    }

    
    const screnItemTime = document.querySelectorAll('.screen__item-time');

    function addClassActiveByTime(){
        choice.time = this.innerText;
        
        screnItemTime.forEach(item => item.classList.remove('item_third-active'));
        this.classList.add('item_third-active');
    
        showСhoiceDateTime();
    }

    //получаем дни работы выбраного доктора и 
    //добавляем классы активности и событие на айтемы с датой и запускаем функцию showTimeJob();
    let jobTime;
    function showTimeDate(name) {
        let doctorNameResult = name;
        const doctorMetroResult = choice.metro;
        let dayJob = [];
        
        //получаем дни работы выбраного доктора
        doctorsData.forEach(doctor => {
        
        if(doctorNameResult == doctor.name){
            doctor.listClinic.forEach(clinic => {
                if(doctorMetroResult == clinic.clinic){
                    jobTime = clinic.timeJob;
                    clinic.timeJob.forEach(time => {
                        dayJob.push(time.day.toLowerCase());
                    });
                }
            });
        }
        });

        const itemData = document.querySelectorAll('.item__data');
        
        //добавляем классы активности и событие на айтемы с датой и запускаем функцию showTimeJob();
        itemData.forEach(day => {
            day.parentElement.style.opacity = '';
            day.parentElement.style.cursor = '';
            day.parentElement.classList.remove('item__point');
            dayJob.forEach(item => {
            if(day.innerText.indexOf(item) > 0){
                day.parentElement.style.opacity = '1';
                day.parentElement.style.cursor = 'pointer';
                day.parentElement.classList.add('item__point');
                //вешаем события на дни приема

                day.parentElement.addEventListener('click', addEventDate);
            }
            });
        });
    }

    //добавляем событие на айтемы с датой и вызываем  функцию  showTimeJob()
    let clickByDateItem;
    function addEventDate() {
        document.querySelector('.screen__selection span').innerHTML = 'Выберите время приёма';
        
        choice.dateAtr = this.dataset;
        screnItemTime.forEach(item => {
            item.removeEventListener('click', addClassActiveByTime)
        });

        if(this.className == 'item__data' || this.className == 'item__month' || this.classList.contains('screen__item-third')){
            clickByDateItem = this.innerText;
            choice.date = clickByDateItem;
        };

        document.querySelectorAll('.item__data').forEach(el => el.parentElement.classList.remove('item_third-active'));
        this.classList.add('item_third-active');

        showTimeJob(jobTime, clickByDateItem);
    }


    function showTimeJob(jobTime, clickByDateItem) {
        
        jobTime.forEach(time => {
            
            if(clickByDateItem.indexOf(time.day.toLowerCase()) > 0){
                
                screnItemTime.forEach(item => {
                    item.style.opacity = ''
                    item.style.cursor = '';
                    item.classList.remove('item__point');
                    item.classList.remove('item_third-active');
                })
                time.time.forEach(itemTime => {
                    screnItemTime.forEach(item => {
                        if(item.innerText === itemTime){
                            item.style.opacity = '1';
                            item.style.cursor = 'pointer';
                            item.classList.add('item__point');  
                        }
                    });
                });
            }
        }); 
        
        

        const itemPoint = document.querySelectorAll('.screen__wrapper-time .item__point');
       
        if(itemPoint){
            itemPoint.forEach(item => {
                item.addEventListener('click', addClassActiveByTime);
            });
        }  
    }   


    function showСhoiceDateTime() {
        const screenSelection = document.querySelector('.screen__selection span');

        let date = new Date(choice.dateAtr.data);
        let dayWeek = date.toLocaleString("ru-ru",  {weekday: 'long'});
        let month = date.toLocaleString("ru-ru",  {month: 'short'});
        let dayMonth = date.getDate();

        screenSelection.innerHTML = `${dayMonth} ${month} (${dayWeek}), ${choice.time}`;

        showConfirmEntry();
    };
    





//fourth-screen start
    
//показывает результаты выбора для подтверждения
    function showConfirmEntry() {

        let childTrue = '';

        if(choice.children){
            childTrue = ' - детский'
        }

        if(document.querySelector('.screen__info')){
            document.querySelector('.screen__info').remove();
        }
        const appointmentFourthScr = document.querySelector('.appointment__fourth-scr .screen__btn-wrapper');
        let date = document.querySelector('.screen__selection span').innerHTML;

        let element = document.createElement('div');
        element.classList.add('screen__info');
        element.innerHTML = ``;
        element.innerHTML = `
            <div class="screen__info-subtitle">Вы записанны:  </div>
            <div class="screen__info-text">дата: <span>${date}</span></div>
            <div class="screen__info-text">специалист: <span>${choice.name} (${choice.specialization} ${childTrue})</span></div>
            <div class="screen__info-text">адрес клиники: <span>метро ${choice.metro}, ${choice.address}</span></div>
            <div class="screen__info-text">телефон: <span>+7(499) 689-252-69</span></div>
        `
        element.classList.add('screen__info-last');
        appointmentFourthScr.before(element);
    };




//вешаем событие на кнопки далее и назад

    const btnForWard = document.querySelectorAll('[data-btnForWard]');
    const btnBack = document.querySelectorAll('[data-btnBack]');
    const screen = document.querySelectorAll('.screen');


    btnForWard.forEach(btn => {
        btn.addEventListener('click', nextScreen);
    });

    btnBack.forEach(btn => {
        btn.addEventListener('click', previousScreen);
    })

    let count = 0;
    const message = ['специалиста', 'метро', 'дату и время', 'Заполните поле "Имя"', 'Заполните поле "Телефон"'];

    const screenFormInput = document.querySelectorAll('.screen__form-input input');
    screenFormInput[1].addEventListener('input', () => {
        screenFormInput[1].value = screenFormInput[1].value.replace(/\D/, "");
    });


    function nextScreen() {

        if(count == 4){

            screen[4].classList.remove('screen_visible')
            screen[0].classList.add('screen_visible')

            choice.name =  '';
            choice.specialization =  '';
            choice.metro = '';
            choice.address = '';
            choice.date = '';
            choice.dateAtr = '';
            choice.time = '';
            choice.patientName = '';
            choice.patientPhone = '';

            screenFormInput[0].value = '';
            screenFormInput[1].value = '';
            count = 0;
            

            document.querySelectorAll('.choose-spec__title').forEach(item => {
                item.classList.remove('choose-spec__item_active');
            })
            
            return;
           
        }

        if(count == 3) {
            
            if(screenFormInput[0].value == ''){
                console.log('Заполните поле "Имя"');
                
                let elem = document.createElement('div');
                elem.classList.add('screen__message');
                elem.innerText = `Заполните поле "Имя"`;
    
                btnForWard[count].parentElement.after(elem);
               
                setTimeout(() => {
                    elem.remove();
    
                  }, 1500);
    
                return;
            }
    
            if(screenFormInput[1].value == ''){
                console.log('Заполните поле "Телефон"');
               
                    
                    let elem = document.createElement('div');
                    elem.classList.add('screen__message');
                    elem.innerText = 'Заполните поле "Телефон"';
        
                    btnForWard[count].parentElement.after(elem);
                   
                    setTimeout(() => {
                        elem.remove();
        
                      }, 1500);
        
                    return; 
            }
    
            choice.patientName = screenFormInput[0].value;
            choice.patientPhone = screenFormInput[1].value; 
        }

        if(count == 1){
            
             //убераем события с активных дат по клику на имя
             document.querySelectorAll('.screen__item-third').forEach(item => {
                
                item.classList.remove('item__point', 'item_third-active');
                item.style.opacity = '';
                item.style.cursor = '';
                item.removeEventListener('click', addEventDate);
          
            });

            
            //убираем все стили активности с блоков время
            document.querySelectorAll('.screen__item-time').forEach(item => {
                item.removeEventListener('click', addClassActiveByTime);
                item.style.opacity = '';
                item.style.cursor = '';
                item.classList.remove('item__point', 'item_third-active');
            });

            const element = document.querySelectorAll('.screen__name-doctor');
            if(element.length == 1){
                element[0].click();
            }
        }
        
        let a;
        switch (count) {
            case 0:
                a = choice.specialization;
                break;
            case 1:
                a = choice.metro;
                break;
            case 2:
                a = choice.time;
                break;
            default:
                break;
        }


        if(a == 0){
            let elem = document.createElement('div');
            elem.classList.add('screen__message');
            elem.innerText = `Выберите ${message[count]}!`;

            btnForWard[count].parentElement.after(elem);
           
            setTimeout(() => {
                elem.remove();

              }, 1500);

            return
        }

        screen.forEach(item => {
            item.classList.remove('screen_visible');
        });

        count++;
        screen[count].classList.add('screen_visible');
        metroActive();
    }

    


    
    
    function previousScreen() {

        


        
        if(count == 2){
          //показываем только активные карточки с адресами
            
            const screenItem = document.querySelectorAll('.screen__item');
            
            screenItem.forEach(item => {
            
            item.style = '';
             let element = item.children[0].innerText.trim();
             
             metroVisible.forEach(metro => {
                if(metro.toLowerCase().trim() == element.toLowerCase()){
                    item.style.opacity = '1';
                    item.style.cursor = 'pointer';

                    
                    item.addEventListener('click', addEventByCardMetro);
                }
             });
        });
        
        }


        screen.forEach(item => {
            item.classList.remove('screen_visible');
        });

        screen[count - 1].classList.add('screen_visible');
        count--;
    }
} 


export default appointment;


















