function dscount(str, symbol1, symbol2) {
  const regex = new RegExp(`(?=${symbol1}${symbol2})`, "gi");
  const matches = str.match(regex);
  console.log({ matches });
  return matches ? matches.length : 0;
}

// Test cases
try {
  test(dscount, ["ab___ab__", "a", "b"], 2);
  test(dscount, ["___cd____", "c", "d"], 1);
  test(dscount, ["de_______", "d", "e"], 1);
  test(dscount, ["12_12__12", "1", "2"], 3);
  test(dscount, ["_ba______", "a", "b"], 0);
  test(dscount, ["_a__b____", "a", "b"], 0);
  test(dscount, ["-ab-аb-ab", "a", "b"], 2);
  test(dscount, ["aAa", "a", "a"], 2);
  console.info("Congratulations! All tests passed.");
} catch (e) {
  console.error(e);
}

function test(call, args, count) {
  let r = call(...args) === count;
  console.assert(r, `Found items count: ${count}`);
  if (!r) throw "Test failed!";
}
