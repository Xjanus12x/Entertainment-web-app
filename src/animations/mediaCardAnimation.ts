export const mediaCardsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between animations of children
    },
  },
};

export const mediaCard = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
