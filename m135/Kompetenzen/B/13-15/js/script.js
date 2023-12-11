async function getData() {
    $.ajax({
        url: "https://gibm.becknet.ch/warenhaus/getFiliale.php?format=JSON",
        method: "GET",
        dataType: "json",
        success: function(response) {
            const dropdown = $("#dropdown");

            dropdown.empty();

            console.log(response);

            $.each(response, function(index, filiale) {
                const option = $("<option>").val(filiale.id).text(filiale.strasse + ", " + filiale.stadt);
                dropdown.append(option);
            });
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    getData();
    dropdown.addEventListener("change", (event) => {
        console.log(event.target.value);
        $.ajax({
            url: "https://gibm.becknet.ch/warenhaus/getFiliale.php?filiale= " + event.target.value + "&format=JSON",
            method: "GET",
            dataType: "json",
            success: function(response) {

                const table = $("<table>");
                const thead = $("<thead>");
                const tbody = $("<tbody>");

                const headerRow = $("<tr>");
                $.each(response[0], function(key, value) {
                    const th = $("<th>").text(key);
                    headerRow.append(th);
                });
                thead.append(headerRow);
                table.append(thead);

                $.each(response, function(index, rowData) {
                    const row = $("<tr>");
                    $.each(rowData, function(key, value) {
                        console.log(value);
                        const cell = $("<td>").text(value);
                        row.append(cell);
                    });
                    tbody.append(row);
                });
                table.append(tbody);

                $("#div").empty().append(table);

                console.log(response);

            },
        });
    });
});