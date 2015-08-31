P360D.LivingroomGUI = function(clothButtonImages, wallsButtonImages, woodsButtonImages, miscButtonImages) {
    /*
     this function creates the Gui for the room
     for example when you click the customize button a panel appears from right the whole panel is handled by this code
     */



    var scope = this;
    var chairImages = clothButtonImages;
    var ottomanImages = clothButtonImages;
    var pillowsImages = clothButtonImages;
    var wall1Images = wallsButtonImages;
    var wall2Images = wallsButtonImages;
    var wall3Images = wallsButtonImages;
    var floorImages = [woodsButtonImages[0], woodsButtonImages[1], woodsButtonImages[2], woodsButtonImages[3], woodsButtonImages[4], woodsButtonImages[5], woodsButtonImages[6], woodsButtonImages[7], woodsButtonImages[8], woodsButtonImages[9], woodsButtonImages[10], woodsButtonImages[26], woodsButtonImages[27], woodsButtonImages[28]];
    var closetImages = [woodsButtonImages[0], woodsButtonImages[11], woodsButtonImages[12], woodsButtonImages[13], woodsButtonImages[14], woodsButtonImages[15], woodsButtonImages[16], woodsButtonImages[17], woodsButtonImages[18], woodsButtonImages[29], woodsButtonImages[30], woodsButtonImages[31]];
    var bifetImages = [woodsButtonImages[0], woodsButtonImages[11], woodsButtonImages[12], woodsButtonImages[13], woodsButtonImages[14], woodsButtonImages[15], woodsButtonImages[16], woodsButtonImages[17], woodsButtonImages[18], woodsButtonImages[29], woodsButtonImages[30], woodsButtonImages[31]];
    var curtainImages = miscButtonImages;
    this.container = document.getElementById("livingroom");
    var Categories = ["CHAIR AND LOVESEAT", "OTTOMANS", "PILLOWS", "TABLE AND BIFFET", "CLOSET", "FLOOR", "CURTAINS", "FRONT LEFT WALL", "FRONT RIGHT WALL", "WINDOW WALL"];
    var _0x1fbcx226 = ["270px", "270px", "270px", "210px", "210px", "210px", "210px", "210px", "210px", "220px"];
    var AllcategoriesDiv = [];
    for (var i = 0, count = Categories.length; i < count; i++) {
        var CategoriesDiv = P360D.DOM.div("livingroom_con" + i);
        CategoriesDiv.style.webkitTransform = "translateY(20px)";
        CategoriesDiv.style.MozTransform = "translateY(20px)";
        CategoriesDiv.style.msTransform = "translateY(20px)";
        CategoriesDiv.style.OTransform = "translateY(20px)";
        CategoriesDiv.style.transform = "translateY(20px)";
        CategoriesDiv.style.height = _0x1fbcx226[i];
        CategoriesDiv.innerHTML = "&nbsp;&nbsp;&nbsp;" + Categories[i];
        this.container.appendChild(CategoriesDiv);
        AllcategoriesDiv.push(CategoriesDiv);
    };
    var allchairbuttons = [],
        allottomanbuttons = [],
        allpillowbuttons = [],
        allclosetbuttons = [],
        allbifetbuttons = [],
        allcurtainsbuttons = [],
        allwall1buttons = [],
        allwall2buttons = [],
        allwall3buttons = [],
        allfloorbuttons = [];
    scope.chairIndex = scope.ottomansIndex = scope.pillowsIndex = scope.closetIndex = scope.bifetIndex = scope.curtainsIndex = scope.wallFront1Index = scope.wallFront2Index = scope.wallLeftIndex = scope.floorIndex = 2;
    for (var i = 0, count = chairImages.length; i < count; i++) {
        var singleButtonChairs = P360D.DOM.div("livingroom_chair" + i);
        singleButtonChairs.appendChild(chairImages[i].cloneNode(true));
        singleButtonChairs.classList.add("textureButton");
        singleButtonChairs.style.left = 10 + (i % 5) * 55 + "px";
        singleButtonChairs.style.top = topDistace + parseInt(i / 5) * 55 + "px";
        allchairbuttons.push(singleButtonChairs);
        AllcategoriesDiv[0].appendChild(singleButtonChairs);
        allchairbuttons[i].addEventListener(browser.clickEvent, function(event) {
            scope.chairIndex = allchairbuttons.indexOf(event.currentTarget)
        }, false);
    };
    for (var i = 0, count = ottomanImages.length; i < count; i++) {
        var singleButtonottoman = P360D.DOM.div("livingroom_ottoman" + i);
        singleButtonottoman.appendChild(ottomanImages[i].cloneNode(true));
        singleButtonottoman.classList.add("textureButton");
        singleButtonottoman.style.left = 10 + (i % 5) * 55 + "px";
        singleButtonottoman.style.top = topDistace + parseInt(i / 5) * 55 + "px";
        allottomanbuttons.push(singleButtonottoman);
        AllcategoriesDiv[1].appendChild(singleButtonottoman);
        allottomanbuttons[i].addEventListener(browser.clickEvent, function(event) {
            scope.ottomansIndex = allottomanbuttons.indexOf(event.currentTarget)
        }, false);
    };
    for (var i = 0, count = pillowsImages.length; i < count; i++) {
        var singleButtonpillow = P360D.DOM.div("livingroom_pillows" + i);
        singleButtonpillow.appendChild(pillowsImages[i].cloneNode(true));
        singleButtonpillow.classList.add("textureButton");
        singleButtonpillow.style.left = 10 + (i % 5) * 55 + "px";
        singleButtonpillow.style.top = topDistace + parseInt(i / 5) * 55 + "px";
        allpillowbuttons.push(singleButtonpillow);
        AllcategoriesDiv[2].appendChild(singleButtonpillow);
        allpillowbuttons[i].addEventListener(browser.clickEvent, function(event) {
            scope.pillowsIndex = allpillowbuttons.indexOf(event.currentTarget)
        }, false);
    };
    for (var i = 0, count = closetImages.length; i < count; i++) {
        console.log(closetImages.length)
        var singleButtoncloset = P360D.DOM.div("livingroom_closet_" + i);
        singleButtoncloset.appendChild(closetImages[i].cloneNode(true));
        singleButtoncloset.classList.add("textureButton");
        singleButtoncloset.style.left = 10 + (i % 5) * 55 + "px";
        singleButtoncloset.style.top = topDistace + parseInt(i / 5) * 55 + "px";
        allclosetbuttons.push(singleButtoncloset);
        AllcategoriesDiv[3].appendChild(singleButtoncloset);
        allclosetbuttons[i].addEventListener(browser.clickEvent, function(event) {
            scope.bifetIndex = allclosetbuttons.indexOf(event.currentTarget)
        }, false);
    };
    for (var i = 0, count = bifetImages.length; i < count; i++) {
        var singleButtonbifet = P360D.DOM.div("livingroom_bifet_" + i);
        singleButtonbifet.appendChild(bifetImages[i].cloneNode(true));
        singleButtonbifet.classList.add("textureButton");
        singleButtonbifet.style.left = 10 + (i % 5) * 55 + "px";
        singleButtonbifet.style.top = topDistace + parseInt(i / 5) * 55 + "px";
        allbifetbuttons.push(singleButtonbifet);
        AllcategoriesDiv[4].appendChild(singleButtonbifet);
        allbifetbuttons[i].addEventListener(browser.clickEvent, function(event) {
            scope.closetIndex = allbifetbuttons.indexOf(event.currentTarget)
        }, false);
    };
    for (var i = 0, count = floorImages.length; i < count; i++) {
        var singleButtonfloor = P360D.DOM.div("livingroom_floor_" + i);
        singleButtonfloor.appendChild(floorImages[i].cloneNode(true));
        singleButtonfloor.classList.add("textureButton");
        singleButtonfloor.style.left = 10 + (i % 5) * 55 + "px";
        singleButtonfloor.style.top = topDistace + parseInt(i / 5) * 55 + "px";
        allfloorbuttons.push(singleButtonfloor);
        AllcategoriesDiv[5].appendChild(singleButtonfloor);
        allfloorbuttons[i].addEventListener(browser.clickEvent, function(event) {
            scope.floorIndex = allfloorbuttons.indexOf(event.currentTarget)
        }, false);
    };
    for (var i = 0, count = curtainImages.length; i < count; i++) {
        var singleButtoncurtains = P360D.DOM.div("livingroom_curtains_" + i);
        singleButtoncurtains.appendChild(curtainImages[i].cloneNode(true));
        singleButtoncurtains.classList.add("textureButton");
        singleButtoncurtains.style.left = 10 + (i % 5) * 55 + "px";
        singleButtoncurtains.style.top = topDistace + parseInt(i / 5) * 55 + "px";
        allcurtainsbuttons.push(singleButtoncurtains);
        AllcategoriesDiv[6].appendChild(singleButtoncurtains);
        allcurtainsbuttons[i].addEventListener(browser.clickEvent, function(event) {
            scope.curtainsIndex = allcurtainsbuttons.indexOf(event.currentTarget)
        }, false);
    };
    for (var i = 0, count = wall1Images.length; i < count; i++) {
        var singleButtonwall1 = P360D.DOM.div("livingroom_wall1_" + i);
        singleButtonwall1.appendChild(wall1Images[i].cloneNode(true));
        singleButtonwall1.classList.add("textureButton");
        singleButtonwall1.style.left = 10 + (i % 5) * 55 + "px";
        singleButtonwall1.style.top = topDistace + parseInt(i / 5) * 55 + "px";
        allwall1buttons.push(singleButtonwall1);
        AllcategoriesDiv[7].appendChild(singleButtonwall1);
        allwall1buttons[i].addEventListener(browser.clickEvent, function(event) {
            scope.wallFront1Index = allwall1buttons.indexOf(event.currentTarget)
        }, false);
    };
    for (var i = 0, count = wall2Images.length; i < count; i++) {
        var singleButtonwall2 = P360D.DOM.div("livingroom_wall2_" + i);
        singleButtonwall2.appendChild(wall2Images[i].cloneNode(true));
        singleButtonwall2.classList.add("textureButton");
        singleButtonwall2.style.left = 10 + (i % 5) * 55 + "px";
        singleButtonwall2.style.top = topDistace + parseInt(i / 5) * 55 + "px";
        allwall2buttons.push(singleButtonwall2);
        AllcategoriesDiv[8].appendChild(singleButtonwall2);
        allwall2buttons[i].addEventListener(browser.clickEvent, function(event) {
            scope.wallFront2Index = allwall2buttons.indexOf(event.currentTarget)
        }, false);
    };
    for (var i = 0, count = wall3Images.length; i < count; i++) {
        var singleButtonwall3 = P360D.DOM.div("livingroom_wall3_" + i);
        singleButtonwall3.appendChild(wall3Images[i].cloneNode(true));
        singleButtonwall3.classList.add("textureButton");
        singleButtonwall3.style.left = 10 + (i % 5) * 55 + "px";
        singleButtonwall3.style.top = topDistace + parseInt(i / 5) * 55 + "px";
        allwall3buttons.push(singleButtonwall3);
        AllcategoriesDiv[9].appendChild(singleButtonwall3);
        allwall3buttons[i].addEventListener(browser.clickEvent, function(event) {
            scope.wallLeftIndex = allwall3buttons.indexOf(event.currentTarget)
        }, false);
    };
};
