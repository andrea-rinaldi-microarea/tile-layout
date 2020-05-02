var carriers = {
};

( carriers => {
    
    view.addView(
            $("#mainView"), 
            IDD_CARRIERS_VIEW,
            [
                IDD_TD_CARRIERS_MAIN,
                IDD_TD_CARRIERS_CONTACTS,
                IDD_TD_CARRIERS_ADDRESS,
                IDD_TD_CARRIERS_CHARGES_CONDITION,
                IDD_TD_CARRIERS_REGISTERS,
                IDD_TD_CARRIERS_TRANSPORTATION_FORM
            ]);

}) (carriers);
