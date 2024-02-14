const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      artworks: {},
      fetchedPages: [],
      pagination: {
        total: 0,
        limit: 12,
        offset: 0,
        total_pages: 0,
        current_page: 1,
      },
    },
    actions: {
      getArtworks: async (page = 1) => {
        const store = getStore();
        if (store.fetchedPages.includes(page)) return;
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${page}`
        );
        const data = await response.json();

        const artworks = await Promise.all(
          data.data.map(async (item) => {
            const imageResponse = await fetch(
              `https://www.artic.edu/iiif/2/${item.image_id}/full/843,1000/0/default.jpg`
            );
            const imageUrl = imageResponse.url;
            return { [item.id]: { ...item, image: imageUrl } }; // Cada obra de arte es un objeto con su id como clave
          })
        );

        const artworksObject = Object.assign({}, ...artworks); // Combina los objetos de las obras de arte en un solo objeto

        setStore({
          artworks: { ...store.artworks, ...artworksObject }, // Combina los nuevos datos de las obras de arte con los existentes
          pagination: data.pagination,
          fetchedPages: [...store.fetchedPages, page],
        });
      },
      getArtworkById: async (id) => {
        const store = getStore();
        if (store.artworks[id]) return;
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks/${id}`
        );
        const data = await response.json();

        setStore((store) => {
          return {
            ...store,
            artworks: {
              ...store.artworks,
              [id]: data.data,
            },
          };
        });
      },
      goToPage: (page) => {
        setStore({
          pagination: {
            ...getStore().pagination,
            current_page: page,
          },
        });

        getActions().getArtworks(page);
      },
    },
  };
};

export default getState;
