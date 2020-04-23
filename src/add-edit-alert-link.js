const TARGET_ELEMENT_SELECTOR = '.chart-action-bar';
const LINK_ELEMENT_ID = 'ewu-edit-alert'

function get_alert_id() {
  const regex = /\balertId=(\d+)/;
  const match = regex.exec(location.href);

  return match && match[1];
}

async function get_target_element() {
  const search_start_ts = Date.now();
  const search_timeout_ms = 10000;

  return new Promise((resolve, reject) => {
    const search = () => {
      const element = document.querySelector(TARGET_ELEMENT_SELECTOR);

      if (element) {
        resolve(element);
      } else if (Date.now() - search_start_ts > search_timeout_ms) {
        reject(`Could not find chart name element after ${search_timeout_ms}ms`);
      } else {
        setTimeout(search, 50);
      }
    };

    search();
  });
}

function create_link_element(alert_id) {
  const link_element = document.createElement('a');
  link_element.id = LINK_ELEMENT_ID;
  link_element.href = `/alerts/${alert_id}`;
  link_element.text = 'Edit Alert'
  link_element.target = '_blank';

  const element = document.createElement('div');
  element.style = 'display: inline-block;';
  element.append(link_element);

  return element;
}

async function insert_link_element(alert_id) {
  const target_element = await get_target_element();

  if (!document.getElementById(LINK_ELEMENT_ID)) {
    const edit_link_element = create_link_element(alert_id);
    target_element.prepend(edit_link_element)
  }
}

async function main() {
  const alert_id = get_alert_id();

  if (!alert_id) {
    return;
  }

  insert_link_element(alert_id);
}

main();
