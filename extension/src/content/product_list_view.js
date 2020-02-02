// product_list_view.js

let ProductListView = function(productListController) {

  let kDownloadButtonProductIdAttribute = 'data-product-id';
  let kDownloadButtonFileTypeAttribute = 'data-product-filetype';

  let findDisabledDownloadButton = function(downloadsContainer, fileType) {
    let selector = 'button.download-btn.download-disabled.tooltip-disabled-downloads.ng-star-inserted';
    let buttons = downloadsContainer.querySelectorAll(selector);

    for (let button of buttons) {
      let buttonText = button.innerText.toLowerCase().trim();
      if (buttonText === fileType)
        return button;
    }

    return null;
  }

  let enableDownloadLink = function(downloadsContainer, fileType, productId) {
    let button = findDisabledDownloadButton(downloadsContainer, fileType);

    if (!button)
      return;

    let bottonDownloadTip = button.querySelector('div.bottom.downloadTooltip');

    button.removeChild(bottonDownloadTip);
    button.setAttribute('class', 'download-btn ng-star-inserted');
    button.setAttribute(kDownloadButtonProductIdAttribute, productId);
    button.setAttribute(kDownloadButtonFileTypeAttribute, fileType);

    button.onclick = downloadButtonClickHandler.bind(button);
  };

  let downloadButtonClickHandler = function() {
    let productId = this.getAttribute(kDownloadButtonProductIdAttribute);
    let fileType = this.getAttribute(kDownloadButtonFileTypeAttribute);

    productListController.download(productId, fileType);
  };

  let findAllReaderLinks = function() {
    return document.querySelectorAll('.reader-link.ng-star-inserted');
  };

  let findDownloadsContainer = function(link) {
    return link.parentNode.querySelector('div.downloads-container');
  };

  let getProductId = function(link) {
    return link.href.substring(link.href.lastIndexOf('/') + 1);
  };

  return {
    enableDownloadLinks: function() {
      let readerLinks = findAllReaderLinks();

      readerLinks.forEach(function(link) {
        let downloadsContainer = findDownloadsContainer(link);
        let productId = getProductId(link);

        enableDownloadLink(downloadsContainer, 'epub', productId);
        enableDownloadLink(downloadsContainer, 'mobi', productId);
        enableDownloadLink(downloadsContainer, 'pdf', productId);
        enableDownloadLink(downloadsContainer, 'video', productId);
      });
    }
  };
};