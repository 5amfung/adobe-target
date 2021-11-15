(function() {
  const content = {
    home: {
      title: 'Home',
      description: 'This is home page.',
    },
    about: {
      title: 'About',
      description: 'This is about page.',
    },
    contact: {
      title: 'Contact',
      description: 'This is contact page.',
    }
  };

  function displayContent(viewName) {
    const div = document.getElementById("spa-content");

    const data = content[viewName];
    let innerHTML = `<div>${data.title} - ${data.description}</div>`;

    if (viewName === 'home') {
      innerHTML += '<div id="convert-foo-spa">Convert</div>';
    }

    div.innerHTML = innerHTML;
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
