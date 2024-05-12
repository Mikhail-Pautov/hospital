import {servicesPriceDoctors, servicesPriceTests, servicesPriceCertificates, servicesPriceInspection, servicesPriceDiagnostics} from "../db/servicesPriceDB";


const services = () => {
    const servicesMenu = document.querySelector('.services__menu');
    const servicesMenuItem = document.querySelectorAll('.services__menu-item');
    const servicesWrapper = document.querySelector('.services__wrapper')
    const servicesItemBtn = document.querySelector('.services__item-btn')
   

    
   try {
    showItem(servicesPriceDoctors);


    servicesMenu.addEventListener('click', (e) => {
        removeItem();
        let target = e.target;
        if(target && target.classList.contains("services__menu-item")){
            servicesMenuItem.forEach(item => {
                item.classList.remove('services__menu_activ');
                target.classList.add('services__menu_activ');
            });
        } 

        switch (target.id) {
            case "doctors":
                showItem(servicesPriceDoctors);
                break
            case "test":
                showItem(servicesPriceTests);
                break
            case "certificates":
                showItem(servicesPriceCertificates);
                break
            case "diagnostics":
                showItem(servicesPriceDiagnostics);
                break
            case "inspection":
                showItem(servicesPriceInspection);
                break
        }
    });


    function showItem(servicesArry){
        servicesArry.forEach((item, i) => {
           
            let elem = document.createElement('div');
            elem.classList.add('services__item');
            elem.innerHTML = `
                        <div class="services__item-logo"><img src="assets/img/services-logo.svg" alt=""></div>
                        <div class="services__item-title">${item[0]}</div>
                        <div class="services__item-price">от ${item[1]} руб.</div>
                        
                `
            servicesWrapper.append(elem);
        });
    };

    function removeItem() {
        let elem = document.querySelectorAll('.services__item');
        elem.forEach(item => item.remove());
    };
   } catch (error) {
    
   }
}; 


export default services;