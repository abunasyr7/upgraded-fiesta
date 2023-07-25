function drawRating(vote) {
  if (vote < 0 || vote > 100) {
    throw new Error("Vote should be between 0 and 100.");
  }

  const rating = Math.ceil(vote / 20);

  switch (rating) {
    case 0:
    case 1:
      return "★☆☆☆☆";
    case 2:
      return "★★☆☆☆";
    case 3:
      return "★★★☆☆";
    case 4:
      return "★★★★☆";
    case 5:
      return "★★★★★";
  }
}

console.log(drawRating(0)); // ★☆☆☆☆
console.log(drawRating(1)); // ★☆☆☆☆
console.log(drawRating(25));
console.log(drawRating(50)); // ★★★☆☆
console.log(drawRating(65));
console.log(drawRating(99)); // ★★★★★
