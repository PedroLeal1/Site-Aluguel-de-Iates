function obterMensagens() {

    var retorno = [];

    var consulta = $.ajax({
        url: 'http://prj-p2-js.herokuapp.com/mensagens',
        method: 'GET',
        dataType: 'json',
        async: false
    }).fail(function () {
        return retorno;
    });

    consulta.done(function (data) {
        retorno = data;
    });

    return retorno;
}

function inserirMensagem(obj) {

    var inserir = $.ajax({

        url: 'http://prj-p2-js.herokuapp.com/mensagens',
        method: 'POST',
        data: JSON.stringify(obj),
        dataType: 'json',
        async: false,
        contentType: 'application/json',
    });
}

function excluirMensagem(idMsg) {

    var inserir = $.ajax({

        url: 'http://prj-p2-js.herokuapp.com/mensagens' + '/' + toString(idMsg),
        method: 'DELETE',
        async: false
    });
}

function validarUsuario(objLoginSenha) {

    //email: admin@admin.com
    //senha: '1234'

    var retorno = false;

    console.log(objLoginSenha);

    var validacao = $.ajax({
        url: 'http://prj-p2-js.herokuapp.com/usuarios/validar',
        method: 'POST',
        dataType: 'json',
        async: false,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        contentType: 'application/json',
        data: JSON.stringify(objLoginSenha)
    }).fail(function () {
        return retorno;
    });

    validacao.done(function (data) {
        retorno = data;
    });

    return retorno;

}
const formElement = document.getElementById("contatoForm")
const nome = document.getElementById("nome")
const email = document.getElementById("email")
const mensagem = document.getElementById("mensagem")
formElement.addEventListener("submit", function (event) {
    event.preventDefault()
    const obj = { nome: nome.value, email: email.value, mensagem: mensagem.value }
    console.log(obj)
    inserirMensagem(obj)
})

function handleSubmit(event) {
	event.preventDefault(); // Impede o envio do formulário

	// Obtém os valores dos campos de email e senha
	var email = document.getElementById('email').value;
	var senha = document.getElementById('senha').value;

	// Cria o objeto com os valores informados
	var obj = { email: email, senha: senha };

	// Chama a função de validação e redireciona para mensagens.html se for verdadeiro
	if (validarUsuario(obj)) {
		window.location.href = 'mensagens.html';
	}

	return false;
}

function validarUsuario(obj) {
	// Valida o usuário e a senha
	var usuarioValido = 'admin@admin.com';
	var senhaValida = '1234';

	if (obj.email === usuarioValido && obj.senha === senhaValida) {
		return true;
	} else {
		return false;
	}
}


function obterMensagens() {
	$.ajax({
		url: 'http://prj-p2-js.herokuapp.com/mensagens',
		type: 'GET',
		success: function (data) {
			// Processar os dados recebidos e criar as linhas da tabela
			var tabela = document.getElementById('tabela-mensagens');
			for (var i = 0; i < data.length; i++) {
				var mensagem = data[i];
				var row = tabela.insertRow(i + 1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				cell1.innerHTML = mensagem.nome;
				cell2.innerHTML = mensagem.email;
				cell3.innerHTML = mensagem.mensagem;
			}
		},
		error: function () {
			console.log('Erro ao obter as mensagens.');
		}
	});
}

