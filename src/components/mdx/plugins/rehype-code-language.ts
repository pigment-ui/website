function rehypeCodeLanguage() {
  return function transformer(tree: any) {
    tree.children.forEach((node: any) => {
      if (node.type === "element" && node.tagName === "pre") {
        node.properties = {
          ...(node.properties || {}),
          "data-language": determineLanguage(node),
        };
      } else if (node.type === "mdxJsxFlowElement" && node.name === "Steps") {
        node.children.forEach((node: any) => {
          if (node.type === "element" && node.tagName === "pre") {
            node.properties = {
              ...(node.properties || {}),
              "data-language": determineLanguage(node),
            };
          }
        });
      }
    });
  };
}

function determineLanguage(node: any) {
  const code = node.children.find((child: any) => child.type === "element" && child.tagName === "code");

  if (code && code.children && code.children.length > 0) {
    return code.properties.className ? code.properties.className[0].split("-")[1] : "plaintext";
  }
}

module.exports = rehypeCodeLanguage;
