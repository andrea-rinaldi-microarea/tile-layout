var feeTemplates = {
};

( feeTemplates => {
    
    view.addView(
            $("#mainView"), 
            IDD_FEETEMPLATES_VIEW,
            [
                IDD_TD_FEETEMPLATES_MAIN_DATA,
                IDD_TD_FEETEMPLATES_PERCENTAGES,
                IDD_TD_FEETEMPLATES_DECLA_DATA,
                IDD_TD_FEETEMPLATES_INPS,
                IDD_TD_FEETEMPLATES_ENASARCO,
                IDD_TD_FEETEMPLATES_DETAIL
            ]);

}) (feeTemplates);
