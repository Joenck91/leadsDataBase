window.onload = function () {
    document.getElementById('tabelas').addEventListener('click', function (event) {
      event.preventDefault(); // Impede que o link recarregue a página
  
      // Enviar uma solicitação para o servidor para recuperar os dados da tabela
      fetch('http://localhost:3000/tabelas')
        .then(response => {
          if (!response.ok) {
            throw new Error('Ocorreu um erro ao recuperar os dados da tabela.');
          }
          return response.json();
        })
        .then(data => {
          // Exibir os dados da tabela na página web
          exibirTabela(data);
        })
        .catch(error => {
          alert(error.message);
        });
    });
  };
  
  // Função para exibir os dados da tabela na página web
  function exibirTabela(data) {
    // Crie uma tabela HTML
    var table = '<table><tr><th>id</th><th>nome</th><th>telefone</th><th>username</th><th>link_whatsapp</th><th>link_telegram</th><th>etapa</th><th>perfil_abordando</th><th>grupo</th></tr>;'
    data.forEach(function (row) {
      table += '<tr><td>' + row.id + '</td><td>' + row.nome + '</td><td>' + row.telefone + '</td><td>' + row.username + '</td><td>' + row.link_whatsapp + '</td><td>' + row.link_telegram + '</td><td>' + row.etapa + '</td><td>' + row.perfil_abordando + '</td><td>' + row.grupo + '</td></tr>';
    });
    table += '</table>';
  
    // Exiba a tabela na página
    document.getElementById('tabelaContainer').innerHTML = table;
    console.log()
  }