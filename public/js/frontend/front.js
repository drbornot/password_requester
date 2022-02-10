function removeElementIfExistByQuerySelector(selector) {
    const elem = !! document.querySelector(selector) ? document.querySelector(selector) : null
    if (elem) {
        removeFadeOut(elem, 1500)
    }
}

function removeFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = `opacity ${seconds}s ease`;

    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, speed);
}

