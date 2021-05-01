(function() {
  const content = {
    home: {
      title: 'Home',
      description: 'This is home page.',
      convertId: 'convert-foo-view-home',
    },
    about: {
      title: 'About',
      description: 'This is about page.',
      convertId: 'convert-foo-view-about',
    },
    contact: {
      title: 'Contact',
      description: 'This is contact page.',
      convertId: 'convert-foo-view-contact',
    }
  };

  function displayContent(viewName) {
    const div = document.getElementById("spa-content");

    const data = content[viewName];

    div.innerHTML = `<div>${data.title} - ${data.description}</div><div id="${data.convertId}">Convert ${data.title}</div>`;
  }

  function changeRoute(viewName) {
    displayContent(viewName);

    window.location = `#${viewName}`;

    if (typeof adobe !== "undefined" && typeof adobe.target !== "undefined") {
      adobe.target.triggerView(viewName);
    }
  }
  window.onload = () => {
    if (window.location.hash) {
      changeRoute(window.location.hash.replace("#", ""));
    }

    window.addEventListener(
      "hashchange",
      evt => {
        // eslint-disable-next-line no-unused-vars
        const [base, route] = evt.newURL.split("#");
        changeRoute(route);
      },
      false
    );
  };
})();
