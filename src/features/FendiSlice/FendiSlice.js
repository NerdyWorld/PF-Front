import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    color: "",
    model: "",
    // Agrega otros campos de filtro comunes si es necesario
  },
  filteredProducts: [], // Almacena los productos filtrados
  productsToShow: 10, // Número inicial de productos para mostrar
  sortingValue: "price",
  sortByPriceAscending: true,
  uniqueModels: [], // Esta propiedad ahora almacena objetos con groupName y models
};

const fendiSlice = createSlice({
  name: "fendi",
  initialState,
  reducers: {
    applyFilters: (state, action) => {
      // Lógica de filtrado aquí
      console.log("called");
      const { colorFilter, modelFilter, color, model } = state.filters;
      const allProducts = action.payload; // Obtén los datos de productos directamente de action
      console.log(colorFilter, modelFilter, color, model);

      // Filtrar productos en función de los filtros seleccionados
      const selectedModelGroup = state.uniqueModels.find((group) =>
        group.models.includes(modelFilter)
      );

      // Filtra productos en función de los filtros seleccionados y el grupo de modelos
      const filteredProducts = allProducts.filter((product) => {
        const colorMatch = !color || product.colors.includes(color);
        const modelMatch =
          !model || selectedModelGroup?.models.includes(product.name); // Comprueba si el modelo pertenece al grupo seleccionado
        return colorMatch && modelMatch;
      });
      state.filteredProducts = filteredProducts;
      if (state.sortByPriceAscending) {
        // Ordenar de menor a mayor precio
        console.log(state.sortByPriceAscending);
        state.filteredProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
      } else {
        // Ordenar de mayor a menor precio
        state.filteredProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
      }
    },
    updateUniqueModels: (state, action) => {
      state.uniqueModels = action.payload;
    },

    setProductsToShow: (state, action) => {
      state.productsToShow = action.payload;
    },
    sortByPriceAscending: (state) => {
      state.sortByPriceAscending = true;
      state.sortingValue = "price"; // Puedes ajustar el valor según tus necesidades
    },

    sortByPriceDescending: (state) => {
      state.sortByPriceAscending = false;
      state.sortingValue = "price"; // Puedes ajustar el valor según tus necesidades
    },
  },
});

export const {
  applyFilters,
  setProductsToShow,
  sortByPriceAscending,
  sortByPriceDescending,
} = fendiSlice.actions;
export default fendiSlice.reducer;
