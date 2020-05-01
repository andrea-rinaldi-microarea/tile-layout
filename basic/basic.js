var basic = {
};

( basic => {
    
    for (t = 0; t < 2; t++) {
        $("#header").append(utils.render(tileTemplate, {
            "title": "Tile "+ t
        }));
    }

    for (t = 0; t < 4; t++) {
        $("#main").append(utils.render(tileTemplate, {
            "title": "Tile "+ t
        }));
    }

}) (basic);
