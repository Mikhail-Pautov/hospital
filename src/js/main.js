import modal from './modules/modal';
import slider from './modules/slider';
import specialistsToggle from './modules/specialistsToggle';
import services from './modules/services';
import doctors from './modules/doctors';
import workSchedule from './modules/workSchedule';
import appointment from './modules/appointment';
import clinicsAddressesList from './modules/clinicsAddressesList';


window.addEventListener('DOMContentLoaded', () => {
    modal();
    slider();
    services();
    clinicsAddressesList();

    try {
        specialistsToggle();
    } catch (error) {
        
    }

    try {
        doctors();
    } catch (error) {
        
    }
    try {
        workSchedule(); 
    } catch (error) {
        
    }
    try {
        appointment();
    } catch (error) {
        
    }
   
});