import doctorsData from "../db/doctorsDB";


const doctorsFilter = () => {
    const doctorsDB = doctorsData;
    const searchFilterInputText = document.querySelector('.search__filter input');
    let resultSeach = [];
    let requestSearch;
        
    
    
    requestSearch = searchFilterInputText.value.toLowerCase();
    searchFilterInputText.value = '';
    
    doctorsDB.forEach(doctor => {
        if (doctor.name.toLowerCase().indexOf(requestSearch) === 0){
            resultSeach.push(doctor);
        } 
    });

    if(resultSeach.length === 0){
        return resultSeach;
    } else {
        return resultSeach;
    } 
    
} 
  
const doctorsFilterMetro = (value) => {

    let resultSearchMetro = [];
    const doctorsDataMetro = doctorsData;
    

    doctorsDataMetro.forEach(doctor => {
            doctor.listClinic.forEach(clinic => {
                if (clinic.clinic === value){
                    resultSearchMetro.push(doctor);
                }
            });
    });

    return resultSearchMetro;
}

const doctorsFilterSpec = (valueSpec) => {
    let resultSearchSpec = [];
    const doctorsDataSpec = doctorsData;

    doctorsDataSpec.forEach(doctor => {
        if (doctor.specialty === valueSpec){
            resultSearchSpec.push(doctor);
        }
    });

    return resultSearchSpec;
}


export {doctorsFilterSpec};
export {doctorsFilterMetro};
export default doctorsFilter;

