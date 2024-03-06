<template>
    <section class="cadastro_modal" :class="{ativo: abrirModalVisualizar}">
        <div class="cadastro_container" >
            <h1>{{ produto.nome }}</h1>
            <ul>
                <li v-if="produto.descricao">Descrição: {{ produto.descricao }}</li>
                <li v-if="produto.quantidade">Quantidade {{ produto.quantidade }}</li>
            </ul>
            <div class="button">
              <button @click="fecharModal">Fechar</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  props: ['abrirModalVisualizar','produto'],
  methods: {
    fecharModal(){
      this.$emit('TerminarModalVisualizar', false)
    },
  }
}  
</script>

<style scoped>
.cadastro_modal::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.5);
}
.cadastro_modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 10%;
  width: 80%;
  padding: 20px;
  display: none;
}

.cadastro_modal.ativo {
    display: block;
}

.cadastro_container {
  position: relative;
  margin: 80px auto;
  background: #ffffff;;
  padding: 40px;
  max-width: 800px;
  width: 50%;
  height: 40%;
  animation: fadeInDown .3s forwards;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
}
.button {
  display: flex;
  justify-content: center;
}
button {
    background: #dad9d8;
    width: 120px;
    height: 30px;
    border-radius: 5px;
    border: none;
    box-shadow: #c0c0c0 0px 2px 7px;
    cursor: pointer;
}
button:hover {
  background: #6d6c6c;
}

</style>