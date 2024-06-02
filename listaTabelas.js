document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('tabelas').addEventListener('click', function (event) {
    event.preventDefault();
    fetch('http://localhost:3000/tabelas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Falha ao recuperar tabelas');
        }
        return response.json();
      })
      .then(tableNames => {
        exibirTabelas(tableNames);
      })
      .catch(error => {
        alert(error.message);

      });
  });
});

function exibirTabelas(tableNames) {
  let table = '<table><tr><th>Tabelas no Banco de Dados</th></tr>';
  tableNames.forEach(name => {
    table += `<tr><td><a href="#" class="table-link" data-table-name="${name}">${name}</a></td></tr>`;
  });
  table += '</table>';

  document.getElementById('tabelaContainer').innerHTML = table;

  document.querySelectorAll('.table-link').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const tableName = this.getAttribute('data-table-name');
      fetchTableData(tableName);
    });
  });
}

function fetchTableData(tableName) {
  fetch(`http://localhost:3000/tabelas/${tableName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Falha ao recuperar dados da tabela');
      }
      return response.json();
    })
    .then(tableData => {
      exibirTabelaCompleta(tableName, tableData);
    })
    .catch(error => {
      alert(error.message);
    });
}

function exibirTabelaCompleta(tableName, tableData) {
  let table = `<table id="dataTable"><tr><th colspan="${Object.keys(tableData[0]).length}">${tableName}</th></tr><tr>`;
  
  // Adicionando cabeçalhos na tabela 
  for (const key in tableData[0]) {
    table += `<th>${key}</th>`;
  }
  table += '</tr>';

  // Adicionando linhas da tabela
  tableData.forEach(row => {
    table += '<tr>';
    for (const key in row) {
      if (key === 'link_whatsapp' || key === 'link_telegram') {
        table += `<td><a href="${row[key]}" target="_blank">${row[key]}</a></td>`;
      } else if (key === 'etapa') {
        table += `<td contenteditable="true" data-table-name="${tableName}" data-id="${row.id}" data-key="etapa">${row[key]}</td>`;
      } else {
        table += `<td>${row[key]}</td>`;
      }
    }
    table += '</tr>';
  });
  table += '</table>';

  document.getElementById('tabelaContainer').innerHTML = table;

  // Adicionando evento para detectar alterações na coluna "etapa"
  document.querySelectorAll('[contenteditable="true"]').forEach(cell => {
    cell.addEventListener('blur', function () {
      const newValue = this.innerText;
      const tableName = this.getAttribute('data-table-name');
      const id = this.getAttribute('data-id');
      const key = this.getAttribute('data-key');
      updateTableCell(tableName, id, key, newValue);
    });
  });
}

// Função para atualizar a célula no banco de dados
function updateTableCell(tableName, id, key, value) {
  fetch(`http://localhost:3000/update-cell`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tableName, id, key, value })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Falha ao atualizar a célula');
    }
    return response.json();
  })
  .then(result => {
    console.log('Célula atualizada com sucesso:', result);
  })
  .catch(error => {
    alert('Erro ao atualizar célula: ' + error.message);
  });
}

// Restante do código omitido para brevidade


function updateTableCell(tableName, id, key, value) {
  fetch(`http://localhost:3000/update-cell`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tableName, id, key, value })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Falha ao atualizar a célula');
    }
    return response.json();
  })
  .then(result => {
    console.log('Célula atualizada com sucesso:', result);
  })
  .catch(error => {
    alert('Erro ao atualizar célula: ' + error.message);
  });
}
document.getElementById('alterarColuna').addEventListener('click', function () {
  alterarColuna(1, 'Novo Valor');
});

function alterarColuna(colIndex, newValue) {
  const table = document.getElementById('dataTable');
  if (!table) return;

  for (let row of table.rows) {
    if (row.cells[colIndex]) {
      row.cells[colIndex].innerText = newValue;
    }
  }
}
