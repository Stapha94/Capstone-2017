class FixedHeadersController {

    // Dynamically changes the column widths
    fixWidth(column1, column2) {
        column1.style.width = column2.offsetWidth+'px';
    }

}

app.controller('fixedHeadersController', FixedHeadersController);