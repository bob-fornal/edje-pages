
const content = document.getElementById("content");

const image = document.getElementById('logo');
const imageUrl = chrome.runtime.getURL('popup/images/logo-le-346-60.png');
image.src = imageUrl;

function generateContent () {
  chrome.storage.sync.get(['links'], ({ links }) => {
    const wrapper = document.createElement('div');
    for (let link of links) {
      const itemWrapper = document.createElement('div');
      itemWrapper.classList.add('link');

      const { title, url, icon } = link;

      let image;
      if (icon.length > 0 && icon[0] !== '~') {
        image = document.createElement('img');
        image.classList.add('icon');
        image.src = icon;
        image.alt = 'favicon';
      } else if (icon.length > 0) {
        image = document.createElement('img');
        image.classList.add('icon');
        const path = chrome.runtime.getURL(icon.replace('~', ''));
        image.src = path;
        image.alt = 'favicon';
      } else {
        image = document.createElement('span');
        image.classList.add('icon');
        image.classList.add('missing');
      }

      const item = document.createElement('a');
      item.textContent = title;
      item.href = url;
      item.target = '_blank';

      itemWrapper.append(image);
      itemWrapper.appendChild(item)
      wrapper.appendChild(itemWrapper);
    }
    content.appendChild(wrapper);
  });
}

generateContent();
