export const calculateDaysRemaining = (deadlineDate) => {
    const today = new Date();
    const deadline = new Date(deadlineDate);
    const difference = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
    return difference > 0 ? difference : 0;
  };
  