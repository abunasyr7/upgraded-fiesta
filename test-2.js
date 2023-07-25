/*
    This function is named "func," and its purpose is to find the last occurrences 
    of two specified characters, 'a' and 'b', within a given string 's'. 
    The function returns the index of the last occurrence of character 'a', 
    the index of the last occurrence of character 'b', or the larger of the two indices 
    if both characters are found.
*/

function func(s, a, b) {
  if (s.match(/^$/)) {
    return -1;
  }
  var i = s.length - 1;
  var aIndex = -1;
  var bIndex = -1;

  while (aIndex == -1 && bIndex == -1 && i > 0) {
    if (s.substring(i, i + 1) == a) {
      aIndex = i;
    }
    if (s.substring(i, i + 1) == b) {
      bIndex = i;
    }
    i = i - 1;
  }
  if (aIndex != -1) {
    if (bIndex == -1) {
      return aIndex;
    } else {
      return Math.max(aIndex, bIndex);
    }
  }
  if (bIndex != -1) {
    return bIndex;
  } else {
    return -1;
  }
}

/*
    New version of code
*/

function findLastIndex(str, symbol1, symbol2) {
  const aIndex = str.lastIndexOf(symbol1);
  const bIndex = str.lastIndexOf(symbol2);

  return Math.max(aIndex, bIndex);
}
