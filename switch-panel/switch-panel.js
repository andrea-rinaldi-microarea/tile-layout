var switchPanel = {
    up: function() {},
    down: function() {},
    auto: function() {}
};

(switchPanel => {
    $("body").prepend($(switchPanelForm));

    function setGlobalProperties() {
        var blockSwitch = 0;
        if (currSize == 3 /*992px*/ || currSize == 4 /*1200px*/) {
            blockSwitch = 1;
        }
        $(":root").css("--block-switch", blockSwitch);
    }

    var currSize = -1;
    var screenSizes = [ '400px', '576px', '768px', '992px', '1200px', '1500px', '1650px' ];
    switchPanel.up = function() {
        if (currSize == screenSizes.length - 1) return;
        if (currSize == -1) currSize = screenSizes.length - 2;
        document.documentElement.style.setProperty('--max-width', screenSizes[++currSize]);
        $("#switch-panel-current-size")[0].innerHTML = screenSizes[currSize];
        setGlobalProperties();
    }
    switchPanel.down = function() {
        if (currSize == 0) return;
        if (currSize == -1) currSize = screenSizes.length - 1;
        document.documentElement.style.setProperty('--max-width', screenSizes[--currSize]);
        $("#switch-panel-current-size")[0].innerHTML = screenSizes[currSize];
        setGlobalProperties();
    }
    switchPanel.auto = function() {
        currSize = -1;
        document.documentElement.style.setProperty('--max-width', 'inherit');
        $("#switch-panel-current-size")[0].innerHTML = "auto";
        setGlobalProperties();
    }
    $("#switch-panel-browser-size")[0].innerHTML = `(browser: ${$(window).width()})`;
    $(window).resize(function() {
        $("#switch-panel-browser-size")[0].innerHTML = `(browser: ${$(window).width()})`;
    });

})(switchPanel);
