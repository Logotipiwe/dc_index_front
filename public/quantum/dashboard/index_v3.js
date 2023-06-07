window.onload = ()=>{
    const sideButtons = Array.from(document.getElementsByClassName('side_button'));
    const selectedClassName = 'selected';
    sideButtons.forEach(elem=>{
        elem.addEventListener('click', e=>{
            const target = e.currentTarget;
            const pageNum = target.dataset.page;
            //убрали со всех кнопок выделение
            sideButtons.forEach(el=>el.className = el.className.replace(selectedClassName, '').trim());
            //скрыли все страницы
            Array.from(document.getElementsByClassName('main_content')).forEach(el=>{
                el.style.display = 'none';
            })
            //поставили выделение нужной кнопке
            target.className += ' ' + selectedClassName;
            //показали нужную страницу
            document.getElementById('main_content_'+pageNum).style.display = 'flex'
        })
    })

    const showModalFunc = modalId =>{
        const openedClass = 'modal_opened';
        const transitionTime = 400;
        const modal = document.getElementById(modalId);
        if(modal.className.includes(openedClass)){
            modal.className = modal.className.replace(openedClass, '');
            setTimeout(()=>{
                modal.style.display = 'none';
            }, transitionTime)
        } else {
            modal.style.display = 'flex';
            setTimeout(()=>{
                modal.className += ' ' + openedClass;
            })
        }
    }

    document.getElementById('add_new_btn_1').onclick = showModalFunc.bind(null, 'modal_1')
    document.getElementById('add_new_btn_2').onclick = showModalFunc.bind(null, 'modal_2')
    Array.from(document.getElementsByClassName('modal')).forEach(modal=>{
        modal.onclick = e=>{
            if(e.target.className.includes('modal')) showModalFunc(e.target.id)
        }
    })

    // document.getElementsByClassName('side_button')[2].click();
}