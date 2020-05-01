var feeTemplates = {
};

( feeTemplates => {
    
    $("#lc1").append(utils.render(tileTemplate, {
        "title": "Main Data"
    }));
    $("#lc1").append(utils.render(tileTemplate, {
        "title": "Percentages"
    }));


    $("#lc2").append(utils.render(tileTemplate, {
        "title": "Declaration data"
    }));
    $("#lc2").append(utils.render(tileTemplate, {
        "title": "INPS"
    }));


    $("#lc3").append(utils.render(tileTemplate, {
        "title": "ENASARCO"
    }));


    $("#lc4").append(utils.render(tileTemplate, {
        "title": "details"
    }));

}) (feeTemplates);
