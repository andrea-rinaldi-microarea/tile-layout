var view = {
    addView(elem, jsonView) {}
};
( view => {

    function createRow(fields) {
        var row = $(tileRowTemplate);
        fields.forEach(field => {
            row.append(field);
        });
        return row;
    }

    function createBodyEdit(item) {
        var be = $(tileControlBodyeditTemplate);
        var header = $("<div/>", {class: "bodyedit-header" });
        item.items.forEach( col => {
            var col = $("<div/>", { class: "bodyedit-cell size-4", text: col.text });
            header.append(col);
        });
        be.children(".bodyedit").append(header);
        for (r = 0; r < 5; r++) {
            var row = $("<div/>", { style: "display: flex;"});
            item.items.forEach( col => {
                var col = $("<div/>", { class: "bodyedit-cell size-4"});
                row.append(col);
            });
            be.children(".bodyedit").append(row);
        }
        return be;
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
        } else if (item.type == "BodyEdit") {
            field.append(createBodyEdit(item));
        }
        if (field.children(".tile-control")) {
            field.children(".tile-control").addClass(item.controlSize ? ("size-" + item.controlSize) : "size-100" );
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

    function createTile(jsonTile) {
        if (!jsonTile) return;

        var tile = $(utils.render(tileTemplate, {
            "title": jsonTile.text
        }));

        if (!jsonTile.text || jsonTile.text == "") {
            tile.children(".tile-title").hide();
        }

        for (c = 1; c <= 4; c++) {
            var col = createColumn("COL" + c, jsonTile);
            if (!col)
                break;
            tile.children(".tile-content").append(col);
        }
        var noAnchor = createColumn(null, jsonTile);
        if (noAnchor) {
            tile.children(".tile-content").append(noAnchor);
        }

        return tile;
    }

    function createLayoutContainer(item, jsonTiles) {
        var lc = $(layoutContainerTemplate);
        if (item.items) {
            item.items.forEach(itm => {
                lc.append(createTile(jsonTiles.find(tile => tile.id == itm.href)));
            });
        } else {
            lc.append(createTile(jsonTiles.find(tile => tile.id == item.href)));
        }
        return lc;
    }

    function createTilegroup(item, jsonTiles) {
        var tg = $(tileGroupTemplate);
        item.items.forEach(item => {
            tg.append(createLayoutContainer(item, jsonTiles));
        });
        return tg;
    }

    view.addView = function(elem, jsonView, jsonTiles) {
        var view = $("<div/>");
        jsonView.items.forEach(item => {
            view.append(createTilegroup(item, jsonTiles));
        });
        elem.append(view);
    }

})(view);