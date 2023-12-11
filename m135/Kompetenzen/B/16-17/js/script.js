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
            $("#dropdown").val(localStorage.getItem("id"));
        }
    });
}

function setItem() {
    $("#div").empty()
    const table = $("<table>");
    const thead = $("<thead>");
    const tbody = $("<tbody>");
    
    const headerRow = $("<tr>");

    const headers = ["stadt", "strasse", "oeffnungszeiten"];

    headers.forEach(header => {
        const th = $("<th>").text(header);
        headerRow.append(th);
    });

    thead.append(headerRow);
    table.append(thead);

    const row = $("<tr>");
    headers.forEach(header => {
        const cell = $("<td>").text(localStorage.getItem(header));
        row.append(cell);
    });
    tbody.append(row);

    table.append(tbody);

    $("#div").empty().append(table);
    }

document.addEventListener("DOMContentLoaded", () => {
    getData();
    setItem();
    dropdown.addEventListener("change", (event) => {
        $.ajax({
            url: "https://gibm.becknet.ch/warenhaus/getFiliale.php?filiale= " + event.target.value + "&format=JSON",
            method: "GET",
            dataType: "json",
            success: function(response) {

                //document.getElementById("demo").innerHTML
                $.each(response, function(index, rowData) {
                    $.each(rowData, function(key, value) {
                        localStorage.setItem(key, value);
                    });
                });
                localStorage.setItem("id", event.target.value);

                setItem();

            },
        });
    button.addEventListener("click", () => {
        localStorage.clear();
        setItem();
        $("#dropdown").val(localStorage.getItem("id"));
    });
    });
});