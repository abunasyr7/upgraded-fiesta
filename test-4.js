function parseUrl(url) {
  const parsedURL = new URL(url);
  return {
    href: parsedURL.href,
    hash: parsedURL.hash,
    port: parsedURL.port,
    host: parsedURL.host,
    protocol: parsedURL.protocol,
    hostname: parsedURL.hostname,
    pathname: parsedURL.pathname,
    origin: parsedURL.origin,
  };
}

let a = parseUrl(
  "http://haveignition.com:8080/fizz/buzz.css?a=1&b[]=a&b[]=b#foo"
);
console.log(
  a.href == "http://haveignition.com:8080/fizz/buzz.css?a=1&b[]=a&b[]=b#foo"
);
console.log(a.hash == "#foo");
console.log(a.port == "8080");
console.log(a.host == "haveignition.com:8080");
console.log(a.protocol == "http:");
console.log(a.hostname == "haveignition.com");
console.log(a.pathname == "/fizz/buzz.css");
console.log(a.origin == "http://haveignition.com:8080");
