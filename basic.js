var basic = {
};

( basic => {

    var tpl = $(tileTemplate);

    for (t = 0; t < 2; t++) {
        $("#header").append($(tileTemplate))
    }

    for (t = 0; t < 4; t++) {
        $("#main").append($(tileTemplate))
    }

}) (basic);
