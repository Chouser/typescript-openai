import * as elements from 'typed-html';
import * as Papa from 'papaparse';

const csvFileInput = document.getElementById('csv-file-input') as HTMLInputElement;
const csvMain = document.getElementById('csv-main') as HTMLElement;

csvFileInput.addEventListener('change', handleCsvFileInputChange);

function handleCsvFileInputChange(event: Event) {
  const fileList = (event.target as HTMLInputElement).files;

  if (fileList && fileList.length > 0) {
    const file = fileList[0];
    const table = document.createElement('table');

    // Display file info
    const caption = document.createElement('caption');
    caption.innerHTML = <span>
      File name: <b><code>{file.name}</code></b>,
          size: <code>{file.size}</code> bytes
    </span>;
    table.appendChild(caption);
    csvMain.insertBefore(table, csvMain.firstChild);

    // Read file content
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      const csvData = (event.target as FileReader).result as string;

      // Parse CSV data
      const parsedCsv = Papa.parse(csvData, { header: true });

      // Add the table header
      const header = table.createTHead();
      const headerRow = header.insertRow();
      parsedCsv.meta.fields?.forEach((key) => {
        const th = document.createElement('th');
        th.innerText = key;
        headerRow.appendChild(th);
      });

      // Add the table rows
      const body = table.createTBody();
      parsedCsv.data.forEach((row) => {
        const tableRow = body.insertRow();
        Object.values(row as Object).forEach((value) => {
          const cell = tableRow.insertCell();
          cell.innerText = value.toString();
        });
      });
    };
  } else {
    alert("Missing or empty file")
  }
}
