import ProductQuery from '../graphql/Product.gql';
import CreateProductMutation from '../graphql/CreateProduct.gql';
import DeleteProductMutation from '../graphql/DeleteProduct.gql'
import UpdateProductMutation from '../graphql/UpdateProduct.gql'
import { apolloClient } from '@/apollo';

export const products = async () => {
const response = await apolloClient.query({ query: ProductQuery })
    return response.data.products;
};

export const createProduct = async (variables) => {
    const response = await apolloClient.mutate({
        mutation: CreateProductMutation,
        variables
    });
    return response.data.createProduct;
};

export const updateProduct = async (variables) => {
    const response = await apolloClient.mutate({
        mutation: UpdateProductMutation,
        variables
    });
    return response.data.updateProduct;
}

export const deleteProduct = async (variables) => {
    const response = await apolloClient.mutate({
        mutation: DeleteProductMutation,
        variables
    })

    return response.data.deleteProduct;
}



