function checkIfEmptiesValues() {
    let args = Array.prototype.slice.call(arguments)
    let result = []
    args.forEach((value, i) => {
        if (!value.length) {
            let name = ""
            switch (i) {
                case 0:
                    name = "Acronym"
                    break;
                case 1:
                    name = "Username"
                    break;
                case 2:
                    name = "Password"
                    break;
            }
            result.push(name)
        }
    }); 
    return result        
}

function message_item(message, flag) {
    const { success_i_call, warning_i_class, error_i_class } = {success_i_call: "fa-check-circle", warning_i_class: "fa-exclamation-triangle", error_i_class: "fa-bug"} 
    let message_type

    switch (flag) {
        case "success":
            message_type = success_i_call
            break;
        case "warning":
            message_type = warning_i_class
            break
        case "error":
            message_type = error_i_class
            break
    }

    const item = 
    function (message, message_type) { 
    
    return `
        <div class="show-message ${flag}">
            <span><i class="fa ${message_type}"></i> ${message}</span>
            <button><i class="fa fa-times"></i></button>
        </div>
    `
    }(message, message_type)

    return item
}

function removeElementIfExistByQuerySelector(selector) {
    const elem = !! document.querySelector(selector) ? document.querySelector(selector) : null
    if (elem) {
        removeFadeOut(elem, 1500)
    }
}

function removeSearchedItems(parentElement) {
    if (parentElement.hasChildNodes()) {
        for (let item of Array.from(parentElement.children)) {
            item.parentNode.removeChild(item)  
        }
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

