// This script is released to the public domain and may be used, modified and
// distributed without restrictions. Attribution not necessary but appreciated.
// Source: https://weeknumber.com/how-to/javascript

// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

//Funktion um Berufe zu laden
async function getDataBeruf() {
  $.ajax({
    url: "http://sandbox.gibm.ch/berufe.php",
    method: "GET",
    dataType: "json",
    success: function (response) {
      const dropdown = $("#BerufsgruppeDropdown");

      $.each(response, function (index, beruf) {
        const option = $("<option>").val(beruf.beruf_id).text(beruf.beruf_name);
        dropdown.append(option);
      });
    },
  });
}

//Funktion um Klassen zu laden
async function getDataKlasse() {
  $.ajax({
    url: "http://sandbox.gibm.ch/klassen.php",
    method: "GET",
    dataType: "json",
    success: function (response) {
      const dropdown = $("#KlasseDropdown");

      $.each(response, function (index, klasse) {
        const option = $("<option>")
          .val(klasse.klasse_id)
          .text(klasse.klasse_longname);
        dropdown.append(option);
      });
    },
  });
}

//Rechnet das Datum in die Kalenderwoche um
//Das Html Element zum Wochen auswählen anstelle von Tagen wird nur teils unterstützt
function calculateDate() {
  var date = new Date($("#date").val());
  const week = date.getWeek();
  const year = date.getFullYear();
  return week + "-" + year;
}

//Funktion um den Stundenplan zu aktualisieren / bauen
function updateTable(response) {
    $("#spinner").show();
  $("#table").empty();

  const table = $("<table>");
  const thead = $("<thead>");
  const tbody = $("<tbody>");

  const headerRow = $("<tr>");

  const headerNames = [
    "Datum",
    "Wochentag",
    "Von",
    "Bis",
    "Lehrer",
    "Fach",
    "Raum",
  ];

  headerNames.forEach((header) => {
    const th = $("<th>").text(header);
    headerRow.append(th);
  });

  thead.append(headerRow);
  table.append(thead);

  $.each(response, function (index, rowData) {
    const row = $("<tr>");

    const headers = [
      "tafel_datum",
      "tafel_wochentag",
      "tafel_von",
      "tafel_bis",
      "tafel_lehrer",
      "tafel_longfach",
      "tafel_raum",
    ];
    headers.forEach((header) => {
      if (header == "tafel_wochentag") {
        //array of days
        const days = [
          "Sonntag",
          "Montag",
          "Dienstag",
          "Mittwoch",
          "Donnerstag",
          "Freitag",
          "Samstag",
        ];
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

  if ($("#KlasseDropdown").val() == 3518598) {
    $("#table").empty();
  } else if (response.length === 0) {
    $("#table").empty();
    showUpdateMessage("Letztes Update: " + new Date().toLocaleString() + " - Keine Daten gefunden");
  } else {
    showUpdateMessage("Letztes Update: " + new Date().toLocaleString());
  }
  //timeout of 1 seconds to show the spinner
    setTimeout(hideSpinner, 1000);
}

//Funktion um den Spinner zu verstecken / Kompetenz C12
function hideSpinner() {
    $("#spinner").hide();
  }

//Funktion um eine Update Nachricht zu erstellen um den Benutzer zu informieren
function showUpdateMessage(message) {
    const updateMessageElement = document.getElementById("updateMessage");
    updateMessageElement.textContent = message;
  }

//Funktion um die Daten aus dem Webstorage zu laden, funktioniert jedoch leider nur beim Datum
async function getDataWebstorage() {
    const beruf_id = localStorage.getItem("beruf_id");
    const beruf_name = localStorage.getItem("beruf_name");
    const klasse_id = localStorage.getItem("klasse_id");
    const klasse_longname = localStorage.getItem("klasse_longname");
    const date = localStorage.getItem("date");
    
    if (beruf_id && beruf_name) {
        $("#BerufsgruppeDropdown").val(beruf_id).text(beruf_name);
    }
    if (klasse_id && klasse_longname) {
        $("#KlasseDropdown").val(klasse_id).text(klasse_longname);
    }
    if (date) {
        $("#date").val(date);
    }

    if (klasse_id && date == null) {
        $.ajax({
            url:
              "http://sandbox.gibm.ch/tafel.php?klasse_id=" +
              klasse_id,
            method: "GET",
            dataType: "json",
            success: function (response) {
              updateTable(response);
            },
          });
    }

    if(klasse_id && date) {
        $.ajax({
            url:
              "http://sandbox.gibm.ch/tafel.php?klasse_id=" +
              klasse_id +
              "&woche=" +
              date,
            method: "GET",
            dataType: "json",
            success: function (response) {
              updateTable(response);
            },
          });
    }

    showUpdateMessage("Letztes Update: " + new Date().toLocaleString());

    
}

//Funktion welche beim Laden der Seite ausgeführt wird, sobald diese bereit ist und Event listener initialisert
document.addEventListener("DOMContentLoaded", () => {
  getDataWebstorage();
  getDataBeruf();
  getDataKlasse();
  $("#spinner").hide();
  showUpdateMessage("Letztes Update: " + new Date().toLocaleString());
  BerufsgruppeDropdown.addEventListener("change", (event) => {
    $.ajax({
      url: "http://sandbox.gibm.ch/klassen.php?beruf_id=" + event.target.value,
      method: "GET",
      dataType: "json",
      success: function (response) {
        showUpdateMessage("Letztes Update: " + new Date().toLocaleString());

        localStorage.setItem("beruf_id", event.target.value);
        localStorage.setItem("beruf_name", event.target.options[event.target.selectedIndex].text);

        const dropdown = $("#KlasseDropdown");

        dropdown.empty();

        $.each(response, function (index, klasse) {
          const option = $("<option>")
            .val(klasse.klasse_id)
            .text(klasse.klasse_longname);
          dropdown.append(option);
        });
      },
      error: function (response) {
        showUpdateMessage("Letztes Update: " + new Date().toLocaleString() + " - Fehler beim Laden der Klassen");
      },
    });
  });
  KlasseDropdown.addEventListener("change", (event) => {
    $.ajax({
      url:
        "http://sandbox.gibm.ch/tafel.php?klasse_id=" +
        event.target.value +
        "&woche=" +
        calculateDate(),
      method: "GET",
      dataType: "json",
      success: function (response) {

        localStorage.setItem("klasse_id", event.target.value);
        localStorage.setItem("klasse_longname", event.target.options[event.target.selectedIndex].text);

        updateTable(response);
      },
    });
  });
  date.addEventListener("change", (event) => {
    $.ajax({
      url:
        "http://sandbox.gibm.ch/tafel.php?klasse_id=" +
        $("#KlasseDropdown").val() +
        "&woche=" +
        calculateDate(),
      method: "GET",
      dataType: "json",
      success: function (response) {

        localStorage.setItem("date", event.target.value);

        updateTable(response);
      },
    });
  });
});
