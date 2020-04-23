function get_alert_id() {
  const regex = /\balerts\/(\d+)/;
  const match = regex.exec(location.href);

  return match && match[1];
}

async function get_target_element(selector) {
  const search_start_ts = Date.now();
  const search_timeout_ms = 10000;

  return new Promise((resolve, reject) => {
    const search = () => {
      const element = document.querySelector(selector);

      if (element) {
        resolve(element);
      } else if (Date.now() - search_start_ts > search_timeout_ms) {
        reject(`Could not find target element after ${search_timeout_ms}ms`);
      } else {
        setTimeout(search, 50);
      }
    };

    search();
  });
}

function create_element() {
  const icon_element = document.createElement('clr-icon');
  icon_element.setAttribute('shape', 'history');

  const element = document.createElement('button');
  element.classList = 'btn btn-sm btn-link';
  element.append(icon_element);
  element.append(' View History');

  return element;
}

async function insert_element(target_element_selector, element) {
  const target_element = await get_target_element(target_element_selector);
  target_element.append(element)
}

async function main() {
  const alert_id = get_alert_id();

  if (!alert_id) {
    return;
  }

  const element = create_element();
  element.onclick = () => window.open(`/alerts/${alert_id}/history`);

  insert_element('.alert-action-buttons', element);
}

main();
