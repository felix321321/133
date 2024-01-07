// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.com/how-to/javascript

// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                          - 3 + (week1.getDay() + 6) % 7) / 7);
  }

async function getDataBeruf() {
    $.ajax({
        url: "http://sandbox.gibm.ch/berufe.php",
        method: "GET",
        dataType: "json",
        success: function(response) {
            const dropdown = $("#BerufsgruppeDropdown");

            dropdown.empty();

            $.each(response, function(index, beruf) {
                const option = $("<option>").val(beruf.beruf_id).text(beruf.beruf_name);
                dropdown.append(option);
            });
        }
    });
}

async function getDataKlasse() {
    $.ajax({
        url: "http://sandbox.gibm.ch/klassen.php",
        method: "GET",
        dataType: "json",
        success: function(response) {
            const dropdown = $("#KlasseDropdown");

            dropdown.empty();

            $.each(response, function(index, klasse) {
                const option = $("<option>").val(klasse.klasse_id).text(klasse.klasse_longname);
                dropdown.append(option);
            });
        }
    });
}

function calculateDate() {
    var date = new Date($("#date").val()); 
    const week = date.getWeek();
    const year = date.getFullYear();
    return week + "-" + year;
}

document.addEventListener("DOMContentLoaded", () => {
    getDataBeruf();
    getDataKlasse();
    BerufsgruppeDropdown.addEventListener("change", (event) => {
        $.ajax({
            url: "http://sandbox.gibm.ch/klassen.php?beruf_id=" + event.target.value,
            method: "GET",
            dataType: "json",
            success: function(response) {
                const dropdown = $("#KlasseDropdown");
    
                dropdown.empty();
    
                $.each(response, function(index, klasse) {
                    const option = $("<option>").val(klasse.klasse_id).text(klasse.klasse_longname);
                    dropdown.append(option);
                });
            }
        });
    });
    KlasseDropdown.addEventListener("change", (event) => {
        $.ajax({
            url: "http://sandbox.gibm.ch/tafel.php?klasse_id=" + event.target.value + "&woche=" + calculateDate(),
            method: "GET",
            dataType: "json",
            success: function(response) {
    
                $("#table").empty();
                console.log(calculateDate());
                console.log(response);

                const table = $("<table>");
                    const thead = $("<thead>");
                    const tbody = $("<tbody>");
                    
                    const headerRow = $("<tr>");

                    const headerNames = ["Datum", "Wochentag", "Von", "Bis", "Lehrer", "Fach", "Raum"];

                    headerNames.forEach(header => {
                        const th = $("<th>").text(header);
                        headerRow.append(th);
                    });

                    thead.append(headerRow);
                    table.append(thead);

                $.each(response, function(index, rowData) {

                    const row = $("<tr>");

                    const headers = ["tafel_datum", "tafel_wochentag", "tafel_von", "tafel_bis", "tafel_lehrer", "tafel_longfach", "tafel_raum"];
                    headers.forEach(header => {
                        if (header == "tafel_wochentag") {
                            //array of days
                            const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
                            row.append($("<td>").text(days[rowData[header]]));
                        } else {
                            const cell = $("<td>").text(rowData[header]);
                            row.append(cell);
                        }
                    });
                    tbody.append(row);
                });

                table.append(tbody);
                $("#table").append(table);
            }
        });
    });
});