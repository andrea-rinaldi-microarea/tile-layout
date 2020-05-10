var test = {
};

( test => {

    var tiles =  [
        IDD_TD_TEST_MISC,
        IDD_TD_TEST_ACCOUNTING
    ];

    var extensions =  [
        IDD_TD_TEST_MISC_EXTENSIONS
    ];

    view.addView(
        $("#mainView"), 
        IDD_TEST_VIEW,
        tiles,
        extensions
    );

})(test);
