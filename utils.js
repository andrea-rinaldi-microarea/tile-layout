var utils = {
    render(template, props) {},
    addTile(elem, id, title) {}
};
( utils => {

    utils.render = function(template, props) {
        for (let [key, value] of Object.entries(props)) {
            template = template.replace(new RegExp(`{${key}}`,"gi"),value);
        }
      
        return template;
    }

    utils.addTile = function(elem, id, title, fields) {
        var tile = $(utils.render(tileTemplate, {
            "title": title
        }));
        tile.attr("id", id);
        if (fields) {
            fields.forEach(field => {
                tile.append(field);
            });
        }
        elem.append(tile);
    }

})(utils);