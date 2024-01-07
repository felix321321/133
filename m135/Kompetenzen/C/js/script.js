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
    
});