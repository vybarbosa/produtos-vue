<template>
    <section class="cadastro_modal" :class="{ativo: abrirModalCadastrar}">
        <div class="cadastro_container">
            <h1 v-if="produto">Alterar Produto</h1>
            <h1 v-else>Cadastrar Produto</h1>
            <form class="form">
                <div class="mb-3">
                  <label class="form-label" for="nome">Nome</label>
                  <input class="form-control form-control-sm" id="nome" name="nome" type="text" v-model="input.nome">
                </div>
                
                <div class="mb-3">
                  <label class="form-label" for="descricao">Descricao</label>
                  <input class="form-control form-control-sm" id="descricao" name="descricao" type="text" v-model="input.descricao">
                </div>

                <div class="mb-3">
                  <label class="form-label" for="quantidade">Quantidade</label>
                  <input class="form-control form-control-sm" id="quantidade" name="quantidade" type="number" v-model="input.quantidade">
                </div>

                <div class="buttons">
                    <button id="buttonFechar" @click.prevent="fecharModal">Fechar</button>
                    <button v-if="produto" id="buttonSalvar" @click.prevent="alterarProduto(produto)">Alterar</button>
                    <button v-else id="buttonSalvar" @click.prevent="salvarProdutos">Salvar</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import { createProduct, updateProduct  } from '@/services/produto'
export default {
  props: ['abrirModalCadastrar','produto'],
  data() {
    return {
      input:{
        nome: '',
        descricao: '',
        quantidade: 0
      },
      idProduto: ''
    }
  },
  methods: {
    fecharModal(){
      this.$emit('terminarModal', false)
      this.limparCamposInput();
    },
    async salvarProdutos(){
     await createProduct({
        nome: this.input.nome,
        descricao: this.input.descricao,
        quantidade: this.input.quantidade
      })
     await this.limparCamposInput(); 
     await this.fecharModal();
    },
    dadosAlterar(){
      if(this.produto){
        const { nome, descricao, quantidade} = this.produto
        this.input.nome = nome;
        this.input.descricao = descricao;
        this.input.quantidade = quantidade;
      }
    },
    async alterarProduto(produto){
     await updateProduct({
        id: produto.id,
        nome: this.input.nome,
        descricao: this.input.descricao,
        quantidade: this.input.quantidade
      })
      await this.limparCamposInput(); 
      await this.fecharModal();
    },
    limparCamposInput() {
      this.input.nome = null;
      this.input.descricao = null;
      this.input.quantidade = null;
    }
  },
  watch: {
    abrirModalCadastrar(){
      if(this.abrirModalCadastrar){
        this.dadosAlterar()
      }
    }
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
 h1 {
  font-size: 1.7rem;
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
  border-radius: 10px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form div {
  width: 100%;
}
.buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

#buttonSalvar {
    background: #a6beff;
    width: 120px;
    height: 30px;
    border-radius: 5px;
    border: none;
    box-shadow: #c0c0c0 0px 2px 7px;
    cursor: pointer;
}

#buttonSalvar:hover{
    background: #82a3fc;
}

#buttonFechar{
    background: #dad9d8;
    width: 120px;
    height: 30px;
    border-radius: 5px;
    border: none;
    box-shadow: #c0c0c0 0px 2px 7px;
    cursor: pointer;
}

#buttonFechar:hover {
  background: #6d6c6c;
}

</style>