function get_alert_id() {
  const regex = /\balertId=(\d+)/;
  const match = regex.exec(location.href);

  return match && match[1];
}

async function get_chart_name_element() {
  const search_start_ts = Date.now();
  const search_timeout_ms = 10000;

  return new Promise((resolve, reject) => {
    const search = () => {
      const element = document.querySelector('.wf-chart-name-wrapper');

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
  const element = document.createElement('div');
  const link_element = document.createElement('a');
  link_element.id = 'ewu-edit-alert';
  link_element.href = `/alerts/${alert_id}`;
  link_element.text = 'edit'
  link_element.target = '_blank';
  element.append('[')
  element.append(link_element);
  element.append(']');
  return element;
}

async function main() {
  const alert_id = get_alert_id();

  if (!alert_id) {
    return;
  }

  try {
    const header_element = await get_chart_name_element();
    const edit_link_element = create_link_element(alert_id);
    header_element.parentElement.append(edit_link_element)
  } catch (error) {
    console.error(`[EWU] ${error}`);
  }
}

main();
