import { useState } from 'react';

export const useFavoritos = () => {
  const [likedProducts, setLikedProducts] = useState(new Set());

  const toggleLike = (productId) => {
    const nuevosLikes = new Set(likedProducts);
    if (nuevosLikes.has(productId)) {
      nuevosLikes.delete(productId);
    } else {
      nuevosLikes.add(productId);
    }
    setLikedProducts(nuevosLikes);
    
    return nuevosLikes.has(productId); // Retorna si ahora es favorito
  };

  const isLiked = (productId) => likedProducts.has(productId);

  return {
    likedProducts,
    toggleLike,
    isLiked
  };
};