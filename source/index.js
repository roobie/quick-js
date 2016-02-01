function hello (name) {
  const format = () => `Hello, ${name || 'Anonymous'}!`;

  return '' + format();
}


export default hello;
