var view = {
    addTile(elem, jsonTile) {},
};
( view => {

    function controlType(controlClass) {
        if (controlClass == "CheckBox") return "checkbox";
        return null;
    }
    
    function createRow(fields) {
        var row = $(tileRowTemplate);
        fields.forEach(field => {
            row.append(field);
        });
        return row;
    }

    function createField(item) {
        return utils.createField(item.text || item.controlCaption, item.captionSize, item.controlSize, controlType(item.controlClass));
    }

    view.addTile = function(elem, jsonTile) {
        var tile = $(utils.render(tileTemplate, {
            "title": jsonTile.text
        }));
        tile.attr("id", jsonTile.id);
        if (jsonTile.items) {
            jsonTile.items.forEach(item => {
                if (item.anchor != "COL1" && item.anchor != "COL2" && item.anchor != "")
                    return;
                var fields = [ createField(item) ];
                jsonTile.items.filter(i => i.anchor == item.id).forEach(anchored => {
                    fields.push(createField(anchored));
                });
                tile.append(createRow(fields));
            });
        }
        elem.append(tile);
    }

})(view);