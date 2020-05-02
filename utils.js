var utils = {
    render(template, props) {},
    addTile(elem, id, title) {},
    createField(label, captionSize, controlSize) {}
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

    utils.createField = function(caption, captionSize, controlSize, controlType) {
        var field = $(utils.render(tileControlTemplate, {
            "caption": caption
        }));
        field.children(".tile-control").addClass("size-" + controlSize);
        field.find(".tile-control .input").hide();
        if (controlType == "enum") {
            field.find(".tile-control .enum").show();
        } else if (controlType == "combo") {
            field.find(".tile-control .combo").show();
        } else if (controlType == "checkbox") {
            field.find(".tile-control .checkbox").show();
        } else {
            field.find(".tile-control .text").show();
        }
        if (captionSize > 0) {
            field.children(".tile-control-caption").addClass("size-" + captionSize);
        } else {
            field.children(".tile-control-caption").hide();
        }
        return field;
    }

})(utils);