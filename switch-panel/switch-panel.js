var switchPanel = {

};

(switchPanel => {
    $("body").prepend($(switchPanelForm));
    var radio = $('#switch-panel-screen-size input:radio');
    radio.click(function() {
        if (this.value == "") {
            $(".container")[0].style.maxWidth= "";
        } else {
            $(".container").css({
                "maxWidth": this.value
              });            
        }
    });
})(switchPanel);
