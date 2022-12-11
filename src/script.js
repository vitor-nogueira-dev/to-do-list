const listaTarefas = document.getElementById('lista-tarefas'); // ol
const textoTarefa = document.getElementById('texto-tarefa'); // imput text
const botaoCriarTarefas = document.getElementById('criar-tarefa'); // botão criar tarefas
const btnClear = document.getElementById('apaga-tudo'); // botão delete items
const pai = document.querySelector('#lista-tarefas');
const btnRemoveFinish = document.querySelector('#remover-finalizados');
const salvarTarefas = document.querySelector('#salvar-tarefas');
const btnCima = document.querySelector('#mover-cima');
const btnBaixo = document.querySelector('#mover-baixo');
const btnRemoveSelected = document.querySelector('#remover-selecionado');

// Função para adicionar a class .completed na tarefa clicada
function classCompleted(event) {
  const linhaClicada = event.target;
  const classList = 'completed';
  if (linhaClicada.className.includes(classList)) {
    linhaClicada.classList.remove(classList);
  } else {
    linhaClicada.classList.add(classList);
  }
}

// Função para adicionar a class .selected na tarefa clicada
function paintBackground(event) {
  const linhaSelecionada = document.querySelector('.selected');
  const linhaNova = event.target;
  if (linhaSelecionada !== null) {
    linhaSelecionada.classList.remove('selected');
  }
  linhaNova.classList.add('selected');
}

// Função para criar tarefas (li)
botaoCriarTarefas.addEventListener('click', () => {
  const linhasTarefas = document.createElement('li');
  listaTarefas.appendChild(linhasTarefas);
  linhasTarefas.innerHTML = textoTarefa.value;
  textoTarefa.value = '';
  linhasTarefas.addEventListener('dblclick', classCompleted);
  linhasTarefas.addEventListener('click', paintBackground);
});

// Função para remover todos as tarefas
btnClear.addEventListener('click', () => {
  const child = document.querySelectorAll('li');
  child.forEach((element) => pai.removeChild(element));
  localStorage.clear();
});

// Função para remover as tarefas finalizadas
btnRemoveFinish.addEventListener('click', () => {
  const linhaSelecionada = document.querySelectorAll('.completed');
  console.log(linhaSelecionada);
  linhaSelecionada
    .forEach((element) => element.remove());
});

// Função para salvar os itens no localStorage
salvarTarefas.addEventListener('click', () => {
  const arrayTarefas = [];
  document.querySelectorAll('li')
    .forEach((tarefa) => {
      const objTarefas = {
        class: tarefa.className,
        textContent: tarefa.textContent,
      };
      arrayTarefas.push(objTarefas);
      localStorage.setItem('tarefas', JSON.stringify(arrayTarefas));
    });
  console.log(pai);
});

// Função para recupar as tarefas do localStorage
function getTarefas() {
  const recuperandoLocalStorage = JSON.parse(localStorage.getItem('tarefas'));
  console.log(recuperandoLocalStorage);
  if (recuperandoLocalStorage) {
    recuperandoLocalStorage.forEach((tarefa) => {
      const li = document.createElement('li');
      li.textContent = tarefa.textContent;
      li.classList = tarefa.class;
      li.addEventListener('click', paintBackground);
      li.addEventListener('dblclick', classCompleted);
      pai.appendChild(li);
    });
  }
}

// Função para mover as tarefas para cima
btnCima.addEventListener('click', () => {
  const tarefaSelecionada = document.querySelector('.selected');
  console.log(tarefaSelecionada);
  if (tarefaSelecionada !== null) {
    const tarefaAnterior = tarefaSelecionada.previousElementSibling;
    if (tarefaAnterior !== null) {
      const dadosTarefaAnterior = {
        innerText: tarefaAnterior.innerText,
        className: tarefaAnterior.className,
      };
      // console.log(dadosTarefaAnterior.className);
      tarefaAnterior.innerText = tarefaSelecionada.innerText;
      tarefaAnterior.className = tarefaSelecionada.className;

      tarefaSelecionada.innerText = dadosTarefaAnterior.innerText;
      tarefaSelecionada.className = dadosTarefaAnterior.className;
      // console.log(tarefaSelecionada);
    }
  }
});

// Função para mover as tarefas para baixo
btnBaixo.addEventListener('click', () => {
  const tarefaSelecionada = document.querySelector('.selected');
  if (tarefaSelecionada !== null) {
    const proximaTarefa = tarefaSelecionada.nextElementSibling;
    if (proximaTarefa !== null) {
      const dadosProximaTarefa = {
        innerText: proximaTarefa.innerText,
        className: proximaTarefa.className,
      };
      proximaTarefa.innerText = tarefaSelecionada.innerText;
      proximaTarefa.className = tarefaSelecionada.className;

      tarefaSelecionada.innerText = dadosProximaTarefa.innerText;
      tarefaSelecionada.className = dadosProximaTarefa.className;
    }
  }
});

// Função para remover a tarefa selecionada
btnRemoveSelected.addEventListener('click', () => {
  const tarefaSelecionada = document.querySelector('.selected');
  if (tarefaSelecionada) {
    tarefaSelecionada.remove();
  }
});

window.onload = getTarefas;
