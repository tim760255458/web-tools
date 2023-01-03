function getChartModules() {
  const files = require.context("./", true, /_module.js$/);
  return files
    .keys()
    .reduce(
      (arr, path) => [
        ...arr,
        {
          name: /\.\/(.*)_module.js$/g.exec(path)
            ? /\.\/(.*)_module.js$/g.exec(path)[1]
            : "",
          title: files(path).title,
          fn: files(path).default,
          data: files(path).exampleData,
          module: files(path),
        },
      ],
      []
    )
    .filter((el) => !!el.name);
}

export default getChartModules;
