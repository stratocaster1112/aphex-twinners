document.addEventListener("DOMContentLoaded", () => {
  const senhaInput = document.getElementById("senha");
  const olhoBtn = document.getElementById("olho");
  const enviarBtn = document.getElementById("enviar");
  const nomeInput = document.getElementById("nome");

  olhoBtn.addEventListener("click", () => {
    if (senhaInput.type === "password") {
      senhaInput.type = "text";
    } else {
      senhaInput.type = "password";
    }
  });

  enviarBtn.addEventListener("click", () => {
    const nome = nomeInput.value.trim();
    const senha = senhaInput.value;

    if (!nome || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const userData = {
      nome: nome,
      senha: senha
    };

    fetch('/cadastro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) throw new Error("Erro ao enviar");
      return response.text();
    })
    .then(msg => {
      alert(msg || "Cadastro enviado com sucesso!");
      console.log("Resposta do servidor:", msg);

      nomeInput.value = "";
      senhaInput.value = "";
      senhaInput.type = "password";
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao enviar os dados.");
    });
  });
});
