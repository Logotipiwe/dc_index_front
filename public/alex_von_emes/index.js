window.onload = ()=> {
    const scrollFunc = () => {
        const animBlocks = document.querySelectorAll('.appear');
        Array.from(animBlocks).forEach((elem, i) => {
            //доля экрана снизу, ниже которой находится верх блока (сверху страницы - 1, снизу страницы - 0, ниже страницы - минусовые)
            const screenTopPosInWindow = (window.innerHeight - elem.getBoundingClientRect().top) / window.innerHeight;
            const animClass = 'anim';
            const animateWindowPos = 0.3; //до какой части экрана должен дойти верх блока чтобы его анимировало
            const elemClasses = elem.className.split(' ');
            if (screenTopPosInWindow > animateWindowPos && !elemClasses.includes(animClass)) {
                elem.setAttribute('class', [...elem.classList, animClass].join(' '));
            }
        })
    }

    window.onscroll = scrollFunc;
    scrollFunc();

};