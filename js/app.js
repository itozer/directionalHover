(function() {
    "use strict";
    //http://hakim.se/
    function ready(fn) {
        if (document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    ready(function() {

        var dhElements, i;

        //add click event listeners to bathroom thumbs
        dhElements = document.querySelectorAll(".dh-wrapper");
        for (i = 0; i < dhElements.length; i++) {
            setDirectionalHover(dhElements[i]);
        }

    });

    function setDirectionalHover(el) {
        el.addEventListener("mouseenter", function(e) {
console.log("mouseenter");
            var pointer = [];
            var that = this;
            var trackMovementHandler;
            pointer.push({x: e.pageX, y: e.pageY});
            return new Promise(function(resolve, reject) {
                trackMovementHandler = function(e) {
                    pointer.push({x: e.pageX, y: e.pageY});
                    //getPointerDirection(pointer);
                    //resolve();
                }
                that.addEventListener("mousemove", trackMovementHandler);

                setTimeout(function() {
                    resolve();
                }, 30);
            })
            .then(function() {
                that.removeEventListener("mousemove", trackMovementHandler);
                getPointerDirection(pointer);
                renderMovement(that);
                console.log("handle display");
    console.log(el);
            });
        });
        el.addEventListener("mouseleave", function() {
            //removeClass(this, "hover");
            console.log("mouseleave");
        });
    }

    function renderMovement(parent) {
        var offsetX = 10;
        var offsetY = 10;
        var top, left, el;
        el = parent.querySelector(".dh-description");
        top = el.offsetTop || 0;
        left = el.offsetLeft || 0;
        el.style.left = left + offsetX + "px";
        el.style.top = top + offsetY + "px";
        el.style.opacity = 1;
        console.log("renderMovement");
        console.log(top);
        console.log(left)
    }


    function getPointerDirection(pointer) {
        //i need to come up with an algorithm here to calc direction
        //var direction = ["n, nw, ne, e, en, es, s, sw, se, w, wn, ws"]
        var changeX, changeY, rtn = "w";
        changeX = (pointer[0].x - pointer[pointer.length - 1].x);
        changeY = (pointer[0].y - pointer[pointer.length - 1].y);
        if (changeY >= 0) {
            rtn = "s";
        } else {
            rtn = "n";
        }

        return "nw";
    }

})();
