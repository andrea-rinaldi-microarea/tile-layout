var utils = {
    render(template, props) {}
};
( utils => {

    utils.render = function(template, props) {
        for (let [key, value] of Object.entries(props)) {
            template = template.replace(new RegExp(`{${key}}`,"gi"),value || "");
        }
      
        return template;
    }

})(utils);