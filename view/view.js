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
        } else if (item.type == "Label" && item.controlClass != "LabelStatic") {
            field.append($(utils.render(tileControlLabelTemplate, { "placeholder": item.placeholder })));
        } else if (item.type == "Label" && item.controlClass == "LabelStatic") {
            field = $(utils.render(tileControlLabelStaticTemplate, { "caption": item.text }));
        } else if (item.type == "BodyEdit") {
            field.append(createBodyEdit(item));
        }
        if (field.children(".tile-control")) {
            field.children(".tile-control").addClass(item.controlSize ? ("size-" + item.controlSize) : "size-100" );
        }
        if (item.captionSize > 0 && (item.text || item.controlCaption)) {
            field.children(".tile-control-caption").addClass("size-" + item.captionSize);
        } else {
            field.children(".tile-control-caption").hide();
        }
        return field;
    }

    function fieldWidth(item) {
        var w = item.controlSize ? item.controlSize : 0;
        if (item.captionSize > 0 && (item.text || item.controlCaption)) {
            w += item.captionSize;
        }
        return w;
    }

    function createColumn(anchor, block, jsonTile) {
        if (!jsonTile.items) return;
        var col = $(tileColumnTemplate);
        var colWidth = 0;
        jsonTile.items.filter(i => i.anchor == anchor && i.block == block).forEach(item => {
            var fields = [ createField(item) ];
            var rowWidth = fieldWidth(item);
            jsonTile.items.filter(i => i.anchor == item.id).forEach(anchored => {
                fields.push(createField(anchored));
                rowWidth += fieldWidth(anchored);
            });
            if (rowWidth > colWidth) {
                colWidth = rowWidth;
            }
            col.append(createRow(fields));
        });
        if (col.children().length > 0) {
            if (jsonTile.variableBlockWidth) {
                col.addClass("flex-" + colWidth);
            }
            return col;
        }
    }

    function extendTile(jsonTile, extensions) {
        if (!jsonTile || !extensions) return jsonTile;

        var extension = extensions.find(ext => ext.extends == jsonTile.id);

        if (!extension) return jsonTile;

        if (jsonTile.items && extension.items) {
            jsonTile.items.forEach(item => {
                var itemExt = extension.items.find(i => i.id == item.id);
                if (itemExt) {
                    $.extend(item, itemExt);
                }
            });
            delete extension.items;
        }

        return $.extend(jsonTile, extension);
    }

    function createTile(jsonTile) {
        if (!jsonTile) return;

        var tile = $(utils.render(tileTemplate, {
            "title": jsonTile.text
        }));

        if (!jsonTile.text || jsonTile.text == "") {
            tile.children(".tile-title").hide();
        }

        if (jsonTile.newsletterColumns) {
            tile.children(".tile-content").addClass("newsletter");
            //style="--rows-1-col:13; --rows-2-col:7; --rows-3-col:5; --rows-4-col:4"
        } else {
            tile.children(".tile-content").addClass("column");
        }

        var blockOrder = 1;
        for (c = 1; c <= 2; c++) {
            // var col = $(tileColumnTemplate);
            for (b = 1; b <= 2; b++) {
                var block = createColumn("COL" + c, "BLK" + b, jsonTile);
                if (!block)
                    break;
                // col.append(block);
                block.addClass("order-" + blockOrder++);
                tile.children(".tile-content").append(block);
            }
            var col = createColumn("COL" + c, null, jsonTile);
            if (col) {
                tile.children(".tile-content").append(col);
            }
        }
        var noAnchor = createColumn(null, null, jsonTile);
        if (noAnchor) {
            tile.children(".tile-content").append(noAnchor);
        }

        return tile;
    }

    function createLayoutContainer(item, jsonTiles, extensions) {
        var lc = $(layoutContainerTemplate);
        if (item.items) {
            item.items.forEach(itm => {
                if (itm.href) {
                    lc.append(createTile(extendTile(jsonTiles.find(tile => tile.id == itm.href), extensions)));
                } else {
                    lc.append(createLayoutContainer(itm, jsonTiles, extensions));
                }
            });
        } else {
            lc.append(createTile(extendTile(jsonTiles.find(tile => tile.id == item.href), extensions)));
        }
        return lc;
    }

    function createTilegroup(item, jsonTiles, extensions) {
        var tg = $(tileGroupTemplate);
        item.items.forEach(item => {
            tg.append(createLayoutContainer(item, jsonTiles, extensions));
        });
        return tg;
    }

    view.addView = function(elem, jsonView, jsonTiles, extensions) {
        var view = $("<div/>");
        jsonView.items.forEach(item => {
            view.append(createTilegroup(item, jsonTiles, extensions));
        });
        elem.append(view);
    }

})(view);