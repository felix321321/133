async function getDataBeruf() {
    $.ajax({
        url: "http://sandbox.gibm.ch/berufe.php",
        method: "GET",
        dataType: "json",
        success: function(response) {
            const dropdown = $("#BerufsgruppeDropdown");

            dropdown.empty();

            $.each(response, function(index, beruf) {
                const option = $("<option>").val(beruf.beruf_name).text(beruf.beruf_name);
                console.log(beruf.beruf_name);
                dropdown.append(option);
            });
        }
    });
}

async function getDataKlasse() {
    $.ajax({
        url: "http://sandbox.gibm.ch/klassen.php?beruf_id=" + $("#BerufsgruppeDropdown").val(),
        method: "GET",
        dataType: "json",
        success: function(response) {
            const dropdown = $("#KlassenDropdown");

            dropdown.empty();

            console.log(response);

            $.each(response, function(index, klasse) {
                const option = $("<option>").val(klasse.name);
                dropdown.append(option);
            });
            $("#BerufsgruppeDropdown").val(localStorage.getItem("Beruf_name"));
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
    getDataBeruf();
    getDataKlasse();
});