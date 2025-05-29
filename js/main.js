let softwareList = [];

function renderTable(list) {
  const tbody = document.querySelector('#softwareTable tbody');
  tbody.innerHTML = '';
  list.forEach(soft => {
    const row = `<tr>
      <td>${soft.name}</td>
      <td>${soft.developer}</td>
      <td>${soft.version}</td>
      <td>${soft.year}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function addSoftware() {
  const name = document.getElementById('name').value;
  const developer = document.getElementById('developer').value;
  const version = document.getElementById('version').value;
  const year = parseInt(document.getElementById('year').value);

  if (!name || !developer || !version || isNaN(year)) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }

  softwareList.push({ name, developer, version, year });
  renderTable(softwareList);
  document.getElementById('name').value = '';
  document.getElementById('developer').value = '';
  document.getElementById('version').value = '';
  document.getElementById('year').value = '';
}

function searchSoftware() {
  const query = document.getElementById('search').value.toLowerCase();
  const filtered = softwareList.filter(soft =>
    soft.developer.toLowerCase().includes(query)
  );
  renderTable(filtered);
}

function sortSoftware() {
  softwareList.sort((a, b) => a.year - b.year);
  renderTable(softwareList);
}

function resetSearch() {
  document.getElementById('search').value = '';
  renderTable(softwareList);
}

function clearAll() {
  softwareList = [];
  renderTable(softwareList);
}

function saveToFile() {
  const dataStr = JSON.stringify(softwareList, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = "software_database.json";
  a.click();
  URL.revokeObjectURL(url);
}

function loadFromFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const loadedData = JSON.parse(e.target.result);
      if (Array.isArray(loadedData)) {
        softwareList = loadedData;
        renderTable(softwareList);
      } else {
        alert("Файл должен содержать массив объектов.");
      }
    } catch (error) {
      alert("Ошибка при загрузке файла.");
    }
  };
  reader.readAsText(file);
}
