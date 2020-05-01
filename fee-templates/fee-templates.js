var feeTemplates = {
};

( feeTemplates => {
    
    utils.addTile($("#lc1"), "IDD_TD_FEETEMPLATES_MAIN_DATA", "Main Data", [
        utils.createField("Template", 3, 3),
        utils.createField("Description", 3, 7)
    ]);
        
    view.addTile($("#lc1"), IDD_TD_FEETEMPLATES_PERCENTAGES);

    utils.addTile($("#lc2"), "IDD_TD_FEETEMPLATES_DECLA_DATA", "Declaration data", [
        utils.createRow([
            utils.createField("Duty Code", 3, 3, "combo"),
            utils.createField("", 0, 6),
        ]),
        utils.createField("Frame 770", 3, 2),
        utils.createField("Administrator fee ", 3, 1, "checkbox"),
    ]);

    utils.addTile($("#lc2"), "IDD_TD_FEETEMPLATES_INPS", "INPS", [
        utils.createRow([
            utils.createField("Calculation Method", 3, 3, "combo"),
            utils.createField("", 0, 6),
        ]),
    ]);

    
    view.addTile($("#lc3"), IDD_TD_FEETEMPLATES_ENASARCO);

    utils.addTile($("#lc4"), "IDD_TD_FEETEMPLATES_DETAIL", "details");

}) (feeTemplates);
