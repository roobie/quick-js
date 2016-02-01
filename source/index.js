function hello (name) {
  const format = () => `Hello, ${name || 'Anonymous'}!`;

  return '1' + format();
}


export default hello;
