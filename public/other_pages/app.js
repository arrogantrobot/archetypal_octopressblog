function app() {
    thing = new cae();
    var param = window.location.search;
    var params = param.slice(1,param.length).split("=");
    var pixPerCell;
    console.log(params);
    if (params[0] == "ppc") {
        pixPerCell = params[1];
    } else {
        pixPerCell = "2";
    }
    thing.setPixelsPerCell(parseInt(pixPerCell));
    thing.init("main_can");
    thing.draw();
}
