import { ApiError } from "../utils/apiError.js";
import { selectQuery} from "../utils/api_connection.js"

async function fetchAll() {
  const getAllProducts = await selectQuery(`
    SELECT * FROM products;`);
  return getAllProducts;
}

async function fetchOne(id) {
  const product = await selectQuery(
    `
    SELECT * FROM products WHERE id = ?;`,
    [id]
  );
  if (!product.length)
    throw new ApiError(
      400,
      "Error obtaining the product or the product doesn't exist"
    );
  return product[0];
}

async function createOne(product) {
  const query = `INSERT INTO products (title,description) VALUES (?,?);`;
  const data = [
    product.title,
    product.description,
  ];
  try {
    const newProduct = await selectQuery(query, data);
    const productId = newProduct.insertId;
    const createdProduct = await selectQuery('SELECT * FROM products WHERE id = ?', [productId]);
    return {
      status: 'success',
      code: 201,
      message: 'Product created successfully',
      data: createdProduct[0]
    };
  } catch (error) {
    // Manejar errores
    console.error('Error creating product:', error);
    throw new ApiError(404,"The product couldn't be created");
  }
}

async function editOne(id, update) {
  const query = `UPDATE products SET title = ?, description = ?, stock = ? WHERE id = ?`;
  const data = [
    update.title,
    update.description,
    update.stock,
    id
  ];
  const productUpdate= await selectQuery(query, data);
  if (productUpdate.affectedRows === 0)
    throw new ApiError(404,"The product doesn't exist or couldn't be updated");
  const updatedProduct = await fetchOne(id);
  return updatedProduct;
}

async function deleteOne(id) {
  const deletedProduct = await selectQuery(`DELETE FROM products WHERE id = ?`, [
    id,
  ]);
  if (deletedProduct.affectedRows === 0)
    throw new Error("The product doesn't exist or couldn't be deleted");
  return;
}

export const productService = {
  fetchAll,
  fetchOne,
  createOne,
  editOne,
  deleteOne,
};
