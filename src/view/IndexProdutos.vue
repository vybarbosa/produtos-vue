<template>
  <div class="container">
    <header class="header">
      <h1>Lista de Produtos:</h1>
      <button @click.prevent="cadastrarProduto = true">Novo produto</button>
    </header>
    <div class="conteudo">
      <table>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Ações</th>
        </tr>
        <tr v-for="produto in listaDeProdutos" :key="produto.id">
          <td>{{ produto.nome }}</td>
          <td>{{ produto.descricao }}</td>
          <td>{{ produto.quantidade }}</td>
          <td class="iconsAcoes">
            <span title="Visualizar" class="ti ti-eye" @click="exibirProduto(produto)"></span
            >
            <span title="editar" class="ti ti-edit" @click="alterarProduto(produto)"
              ></span
            >
            <span title="remover" class="ti ti-circle-minus" @click="preRemoverProduto(produto)"
              ></span
            >
          </td>
        </tr>
      </table>
    </div>
    <ModalCadastro
      :abrirModalCadastrar="cadastrarProduto"
      :produto="produtoAtual"
      @terminarModal="fecharModal"
    />
    <ModalVisualizarProduct
      v-if="produtoAtual"
      :abrirModalVisualizar="visualizarProduto"
      :produto="produtoAtual"
      @TerminarModalVisualizar="fecharModalVisualizar"
    />
    <section class="exclusao_product_modal" :class="{ativo: removerProduto}">
        <div class="exclusao_product_container" >
            <div class="informacao_modal_exclusao">
              <h3>Confirma a Exclusão?</h3>
            </div>
            <div class="buttons">
              <button class="buttonCancelar" @click="removerProduto = false">Cancelar</button>
              <button class="buttonExcluir" @click="excluirProduto(produtoAtualExcluido)">Excluir</button>
            </div>
        </div>
    </section>
    <div class="paginacao">
        <button @click="previousPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
      </div>
  </div>
</template>

<script>
import { products, deleteProduct } from "@/services/produto";
import ModalCadastro from "../components/ModalCadastro.vue";
import ModalVisualizarProduct from "@/components/ModalVisualizarProduct.vue";

export default {
  data() {
    return {
      cadastrarProduto: false,
      visualizarProduto: false,
      removerProduto: false,
      listaDeProdutos: [],
      totalProdutos: null,
      produtoAtual: null,
      produtoAtualExcluido: null,
      itemsPerPage: 5,
      currentPage: 1,
      totalPages: null
    };
  },
  components: {
    ModalCadastro,
    ModalVisualizarProduct,
  },
  methods: {
    async fecharModal(evento) {
      await this.buscarProdutos();
      this.produtoAtual = null;
      this.cadastrarProduto = evento;
    },
    fecharModalVisualizar(evento) {
      this.visualizarProduto = evento;
      this.produtoAtual = null;
    },
    async excluirProduto(idProduto) {
      await deleteProduct({ id: idProduto });
      await this.buscarProdutos();
      this.removerProduto = false
    },
    exibirProduto(produto) {
      this.produtoAtual = produto;
      this.visualizarProduto = true;
    },
    alterarProduto(produto) {
      this.produtoAtual = produto;
      this.cadastrarProduto = true;
    },
    preRemoverProduto(produto){
      this.produtoAtualExcluido = produto.id
      this.removerProduto = true
    },
    async buscarProdutos() {
      try {
        const allProducts = await products();
        this.totalPages = Math.ceil(allProducts.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.listaDeProdutos = allProducts.slice(startIndex, endIndex);
        this.totalProdutos = allProducts.reduce((acc, allProducts) => {
          return acc + allProducts.quantidade
        }, 0)
      } catch (error) {
        this.listaDeProdutos = [];
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.buscarProdutos();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.buscarProdutos();
      }
    },
  },
  async created() {
    await this.buscarProdutos();
  },
};
</script>

<style scoped>

.container {
  font-family: "Catamaran", sans-serif;
}
.header {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
}
.quantidadeProdutos{
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
.quantidadeProdutos p {
  margin: auto 10px;
}
.valorQuantidade {
  background: #c0c0c0;
  width: 50px;
  height: 50px;
  box-shadow: #c0c0c0 0px 2px 7px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.valorQuantidade h6 {
  margin: 0;
  font-size: 1.2rem;
}
.header button {
  background: #ffffff;
  width: 120px;
  height: 35px;
  border-radius: 5px;
  border: none;
  box-shadow: #c0c0c0 0px 2px 7px;
  cursor: pointer;
}

.header button:hover {
  background: #7c7c7c;
}
.conteudo {
  margin-top: 70px;
}
table,
th,
td {
  border: none;
}
table {
  box-shadow: #c0c0c0 0px 2px 7px;
  width: 100%;
  border-collapse: collapse;
  background: #e4e4e4;
}
th,
td {
  padding: 10px;
  text-align: center;
  width: 120px;
}
.iconsAcoes {
  width: 100%;
  display: flex;
  justify-content: center;
}

.iconsAcoes span {
  cursor: pointer;
  font-size: 20px;
  margin-left: 15px;
}
th {
  font-weight: bold;
}
tr:nth-child(even) {
  background-color: #ffffff;
}
.exclusao_product_modal::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.5);
}
.exclusao_product_modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 10%;
  width: 80%;
  padding: 20px;
  display: none;
}

.exclusao_product_modal.ativo {
    display: block;
}

.exclusao_product_container {
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
.buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}
.buttons .buttonCancelar{
    background: #dad9d8;
    width: 120px;
    height: 30px;
    border-radius: 5px;
    border: none;
    box-shadow: #c0c0c0 0px 2px 7px;
    cursor: pointer;
}

.buttons .buttonCancelar:hover {
  background: #b3b3b3;
}
.buttons .buttonExcluir {
    background: #a6beff;
    width: 120px;
    height: 30px;
    border-radius: 5px;
    border: none;
    box-shadow: #c0c0c0 0px 2px 7px;
    cursor: pointer;
}
.buttons .buttonExcluir:hover {
  background: #82a3fc;
}
.paginacao{
  display:flex;
  justify-content: center;
  margin-top: 20px;
}
.paginacao button {
  background: #dad9d8;
  width: 120px;
  height: 30px;
  border-radius: 5px;
  border: none;
  box-shadow: #c0c0c0 0px 2px 7px;
  cursor: pointer;
}
.paginacao button:hover {
  background: #6d6c6c;
}

.paginacao span {
  padding-left: 20px;
  padding-right: 20px;
}
</style>