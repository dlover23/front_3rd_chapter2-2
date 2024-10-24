import { useState } from "react";
import { Product } from "../../types";

export const useProductForm = (onProductAdd: (newProduct: Product) => void) => {
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });
  };

  return {
    newProduct,
    setNewProduct,
    handleAddNewProduct,
  };
};
