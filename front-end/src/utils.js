export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");
  return {
    resource: request[1],
    id: request[2],
    // action: request[3]
  };
};

export const $ = (selector) => {
  let element = document.querySelectorAll(selector);
  return element.length == 1 ? element[0] : [...element];
};

export const reRender = async (component, position = "") => {
  if (position) {
    $(position).innerHTML = await component.render();
  } else {
    $("#main-content").innerHTML = await component.render();
  }
  await component.afterRender();
};
