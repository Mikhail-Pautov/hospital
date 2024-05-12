const modal = () => {
    const btn = document.querySelector('.header__order-call');
    const modal = document.querySelector('.modal');
    const close = document.querySelector('.modal__wrapper-close');
    

    btn.addEventListener('click', () => {
        showModal()
    });


    close.addEventListener('click', () => {
        closeModal()
    });

    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape'){
            modal.style.display = '';
        }
    });  

    function showModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
         modal.addEventListener('click', (e) => {
            if(e.target.classList.contains('modal')){
                closeModal();
            };
        });
    }

    function closeModal() {
        modal.style.display = '';
        document.body.style.overflow = ''; 
        modalInfo.classList.add('modal__info_hide');
        contForm.style.display = 'block';
    }

//form
    const contForm = document.querySelector('.modal__form');
    const modalInfo = document.querySelector('.modal__info');
    const input = document.querySelectorAll('.modal__form input');
    
    const postDate = async (url, data) => {
        let res =  await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    input.forEach((item, i) => {
       item.addEventListener('input', (e) => {
        if(input[i].name == 'phone'){
            let message = document.querySelector('.modal__notification');
            if(!/[0-9]/g.test(e.data)){
                input[i].style.borderColor = 'red';
                message.style.display = 'block';   
            } else {
                input[i].textContent = '';
                input[i].style.borderColor = '';
                message.style.display = '';
            }
            input[i].value = input[i].value.replace(/\D/, "");
        }
       });
       
    });

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    };
    
    contForm.addEventListener('submit', (e) => {
        e.preventDefault();

        contForm.style.display = 'none';
        modalInfo.classList.remove('modal__info_hide');
        
        const formData = new FormData(contForm);

        postDate('server.php', formData)
            .then(res => {
            })
            .catch(() => {
                let error = new Error();
                console.log(error.message);
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    closeModal();
                }, 5000);
            })
    });
    
    
   
}; 

export default modal;