var carriers = {
};

( carriers => {
    
    var tiles =  [
        IDD_TD_CARRIERS_MAIN,
        IDD_TD_CARRIERS_CONTACTS,
        //IDD_TD_CARRIERS_ADDRESS_BR,
        IDD_TD_CARRIERS_ADDRESS,
        IDD_TD_CARRIERS_CHARGES_CONDITION,
        IDD_TD_CARRIERS_REGISTERS,
        IDD_TD_CARRIERS_TRANSPORTATION_FORM
    ];
    var countryBR = false;

    function loadView() {
        view.addView(
            $("#mainView"), 
            IDD_CARRIERS_VIEW,
            tiles
        );
    }
    loadView();

    function removeTile(tile) {
        var idx = tiles.findIndex( t => t.id == tile.id);
        if (idx != -1) {
            tiles.splice(idx,1);
        }
    }

    $("#switch-panel-country").click(function() {
        if (!countryBR) {
            removeTile(IDD_TD_CARRIERS_ADDRESS);
            removeTile(IDD_TD_CARRIERS_REGISTERS);
            tiles.push(IDD_TD_CARRIERS_ADDRESS_BR);
        } else {
            removeTile(IDD_TD_CARRIERS_ADDRESS_BR);
            tiles.push(IDD_TD_CARRIERS_ADDRESS);
            tiles.push(IDD_TD_CARRIERS_REGISTERS);
        }
        countryBR = !countryBR;
        $("#mainView")[0].innerHTML = "";
        loadView();
});

}) (carriers);
