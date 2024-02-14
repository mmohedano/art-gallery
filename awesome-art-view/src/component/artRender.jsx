import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Modal from "react-modal";
import { Carousel } from "react-responsive-carousel";

const ArtRender = () => {
  const { store, actions } = useContext(Context);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentArtwork, setCurrentArtwork] = useState(null);

  useEffect(() => {
    actions.getArtworks();
  }, []);

  const openModal = (artwork) => {
    setCurrentArtwork(artwork);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextPage = () => {
    actions.getArtworks(store.pagination.current_page + 1);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {store.artworks &&
          Object.entries(store.artworks).map(([key, artwork], index) => {
            return (
              <div
                className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto"
                key={index}
                onClick={() => openModal(artwork)}
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-56 object-cover object-center"
                />
                <div className="p-4">
                  <h5 className="text-xl font-medium">{artwork.title}</h5>
                </div>
              </div>
            );
          })}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={nextPage}
          disabled={
            store.pagination.current_page === store.pagination.total_pages
          }
        >
          Next Page
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Artwork Details"
        className="fixed inset-0 flex items-center justify-center p-4 bg-white overflow-auto"
      >
        {currentArtwork && (
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-full mx-auto overflow-y-auto shadow-lg">
            <div className="flex justify-end pr-4 pt-4">
              <button onClick={closeModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-500 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="px-8 py-4">
              <h2 className="text-2xl font-bold mb-4">
                {currentArtwork.title}
              </h2>
              <img
                src={currentArtwork.image}
                alt={currentArtwork.title}
                className="w-full h-auto object-contain mb-4"
              />
              <p
                className="text-base"
                dangerouslySetInnerHTML={{ __html: currentArtwork.description }}
              ></p>
              <p className="text-sm text-gray-500">
                {currentArtwork.artist_display}
              </p>
              <p className="text-sm text-gray-500">
                {currentArtwork.date_display}
              </p>
              <p className="text-sm text-gray-500">
                {currentArtwork.medium_display}
              </p>
              <p className="text-sm text-gray-500">
                {currentArtwork.credit_line}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ArtRender;
