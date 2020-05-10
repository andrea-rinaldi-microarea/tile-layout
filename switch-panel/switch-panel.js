var switchPanel = {
    up: function() {},
    down: function() {},
    auto: function() {}
};

(switchPanel => {
    $("body").prepend($(switchPanelForm));

    var currSize = -1;
    var screenSizes = [ '400px', '540px', '720px', '960px', '1140px' ];
    switchPanel.up = function() {
        if (currSize == screenSizes.length - 1) return;
        if (currSize == -1) currSize = screenSizes.length - 2;
        document.documentElement.style.setProperty('--max-width', screenSizes[++currSize]);
        $("#switch-panel-current-size")[0].innerHTML = screenSizes[currSize];
    }
    switchPanel.down = function() {
        if (currSize == 0) return;
        if (currSize == -1) currSize = screenSizes.length - 1;
        document.documentElement.style.setProperty('--max-width', screenSizes[--currSize]);
        $("#switch-panel-current-size")[0].innerHTML = screenSizes[currSize];
    }
    switchPanel.auto = function() {
        currSize = -1;
        document.documentElement.style.setProperty('--max-width', 'inherit');
        $("#switch-panel-current-size")[0].innerHTML = "auto";
    }
    $("#switch-panel-browser-size")[0].innerHTML = `(browser: ${$(window).width()})`;
    $(window).resize(function() {
        $("#switch-panel-browser-size")[0].innerHTML = `(browser: ${$(window).width()})`;
    });

})(switchPanel);
