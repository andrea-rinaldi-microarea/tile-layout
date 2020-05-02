var switchPanel = {

};

(switchPanel => {
    $("body").prepend($(switchPanelForm));
    var radio = $('#switch-panel-screen-size input:radio');
    radio.click(function() {
        if (this.value == "") {
            $("#mainView")[0].style.maxWidth= "";
        } else {
            $("#mainView").css({
                "maxWidth": this.value
              });            
        }
    });
})(switchPanel);
