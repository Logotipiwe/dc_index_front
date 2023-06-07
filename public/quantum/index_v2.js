window.onload = ()=>{
    const scrollFunc = ()=>{
        const animBlocks = document.getElementsByClassName('to_anim');
        Array.from(animBlocks).forEach((elem, i)=>{
            //доля экрана снизу, ниже которой находится верх блока (сверху страницы - 1, снизу страницы - 0, ниже страницы - минусовые)
            const screenTopPosInWindow = (window.innerHeight - elem.getBoundingClientRect().top)/window.innerHeight;
            const animClass = 'anim';
            const animateWindowPos = 0.3; //до какой части экрана должен дойти верх блока чтобы его анимировало
            const elemClasses = elem.className.split(' ');
            if(screenTopPosInWindow > animateWindowPos && !elemClasses.includes(animClass)) {
                elem.setAttribute('class', [...elem.classList, animClass].join(' '));
            }
        })
    }

    window.onscroll = scrollFunc;
    scrollFunc();

    console.log(Object.keys(document.getElementById('header_burger')));

    document.getElementById('header_burger').onclick = ()=>{
        const body = document.getElementsByTagName('body')[0];
        if(body) body.style.overflowY = 'hidden';
        document.getElementById('header_right').className += ' opened'
    }
    document.getElementById('header_bottom').onclick = ()=>{
        const elem = document.getElementById('header_right');
        let openedClassName = 'opened';
        let closedClassName = 'closing';
        elem.className = elem.className.replace(openedClassName,closedClassName);
        const body = document.getElementsByTagName('body')[0];
        if(body) body.style.overflowY = 'initial';
        setTimeout(()=>{
            elem.className = elem.className.replace(closedClassName, '').trim();
        }, 500)
    }
}
