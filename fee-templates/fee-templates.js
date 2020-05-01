var feeTemplates = {
};

( feeTemplates => {
    
    utils.addTile($("#lc1"), "IDD_TD_FEETEMPLATES_MAIN_DATA", "Main Data");
    utils.addFields($("#IDD_TD_FEETEMPLATES_MAIN_DATA"), [
        utils.createField("Template", 3, 3),
        utils.createField("Description", 3, 7)
    ]);
        
    utils.addTile($("#lc1"), "IDD_TD_FEETEMPLATES_PERCENTAGES", "Percentages");
    utils.addFields($("#IDD_TD_FEETEMPLATES_PERCENTAGES"), [
        utils.createField("Tax %", 3, 2),
        utils.createRow([
            utils.createField("WT %", 3, 2),
            utils.createField("", 0, 3, "enum")    
        ]),
        utils.createField("WT Base", 3, 2)
    ]);

    utils.addTile($("#lc2"), "IDD_TD_FEETEMPLATES_DECLA_DATA", "Declaration data");
    utils.addTile($("#lc2"), "IDD_TD_FEETEMPLATES_INPS", "INPS");

    utils.addTile($("#lc3"), "IDD_TD_FEETEMPLATES_ENASARCO", "ENASARCO");

    utils.addTile($("#lc4"), "IDD_TD_FEETEMPLATES_DETAIL", "details");

}) (feeTemplates);
