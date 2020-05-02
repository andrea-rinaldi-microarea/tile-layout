var view = {
    addTile(elem, jsonTile) {},
};
( view => {

    function createRow(fields) {
        var row = $(tileRowTemplate);
        fields.forEach(field => {
            row.append(field);
        });
        return row;
    }

    function createField(item) {
        var field = $(utils.render(tileControlGroupTemplate, {
            "caption": item.text || item.controlCaption
        }));
        if (item.type == "Combo" && item.comboType && item.comboType == 2) {
            field.append($(tileControlEnumTemplate));
        } else if (item.type == "Combo" && (!item.comboType || item.comboType != 2)) {
            field.append($(tileControlComboTemplate));
        } else if (item.type == "Check") {
            field.append($(tileControlCheckboxTemplate));
        } else if (item.type == "Edit") {
            field.append($(tileControlEditTemplate));
        } else if (item.type == "Label") {
            field.append($(tileControlLabelTemplate));
        }
        if (field.children(".tile-control")) {
            field.children(".tile-control").addClass("size-" + item.controlSize);
        }
        if (item.captionSize > 0) {
            field.children(".tile-control-caption").addClass("size-" + item.captionSize);
        } else {
            field.children(".tile-control-caption").hide();
        }
        return field;
    }

    function createColumn(tag, jsonTile) {
        if (!jsonTile.items) return;
        var col = $(tileColumnTemplate);
        jsonTile.items.filter(i => i.anchor == tag).forEach(item => {
            var fields = [ createField(item) ];
            jsonTile.items.filter(i => i.anchor == item.id).forEach(anchored => {
                fields.push(createField(anchored));
            });
            col.append(createRow(fields));
        });
        if (col.children().length > 0)
            return col;
    }

    view.addTile = function(elem, jsonTile) {
        var tile = $(utils.render(tileTemplate, {
            "title": jsonTile.text
        }));
        tile.attr("id", jsonTile.id);
        // if (jsonTile.items) {
        //     var col1 = $(tileColumnTemplate);
        //     jsonTile.items.filter(i => i.anchor == "COL1").forEach(item => {
        //         if (item.anchor != "COL1" && item.anchor != "COL2" && item.anchor != "")
        //             return;
        //         var fields = [ createField(item) ];
        //         jsonTile.items.filter(i => i.anchor == item.id).forEach(anchored => {
        //             fields.push(createField(anchored));
        //         });
        //         col1.append(createRow(fields));
        //     });
        // }
        for (c = 1; c <= 4; c++) {
            var col = createColumn("COL" + c, jsonTile);
            if (!col)
                break;
            tile.children(".tile-content").append(col);
        }
        elem.append(tile);
    }

})(view);