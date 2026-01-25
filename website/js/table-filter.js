function setupTableFilter(inputId, tableId) {
    const searchInput = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    if (!searchInput || !table) {
        return;
    }

    searchInput.addEventListener("keyup", function() {
        const filter = searchInput.value.toLowerCase();

        for (let i = 0; i < rows.length; i++) {
            const titleCell = rows[i].getElementsByTagName("td")[0];
            const descriptionCell = rows[i].getElementsByTagName("td")[1];
            
            if (titleCell || descriptionCell) {
                const titleText = titleCell ? titleCell.textContent || titleCell.innerText : "";
                const descriptionText = descriptionCell ? descriptionCell.textContent || descriptionCell.innerText : "";
                
                if (titleText.toLowerCase().indexOf(filter) > -1 || descriptionText.toLowerCase().indexOf(filter) > -1) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }
    });
}
