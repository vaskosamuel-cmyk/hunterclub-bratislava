export const calculateTotalRounds = (details: string[]): number => {
  let total = 0;
  details.forEach(detail => {
    const match = detail.match(/(\d+)\s*(?:výstrelov|výstrel)/i);
    if (match) {
      total += parseInt(match[1], 10);
    }
  });
  return total;
};
