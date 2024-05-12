import { hospitalAddresses } from "../db/hospitalAddressesDB";


const clinicsAddressesList = () => {

    function showMetro(){

        const wrapperList = document.querySelector('.addresses-list')

        if(!wrapperList) {
            return;
        }


        hospitalAddresses.forEach(item => {

            let elm = document.createElement('div');
            elm.classList.add('addresses-list__item');
    
            elm.innerHTML = `
                
                    <div class="screen__item-metro">
                        <img src="assets//img/metro-logo.svg" alt="">
                        <div class="screen__item-text">${item.metro}</div>
                    </div>
                    <p>Адрес:</p>
                    <div class="screen__item-address">${item.addresses}</div> 
                    <div class="screen__item-phone">+7(499) 658-963-25</div>
               
            `
    
            wrapperList.append(elm);
        }) 
    }

    showMetro();
    
}

export default clinicsAddressesList;










