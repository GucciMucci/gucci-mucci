module.exports = {
  sortURL: a => {
    let getValue = url => {
      return url.substring(url.indexOf("0000") - 8, url.indexOf("0000") - 5);
    };
    let swapped = false;
    do {
      swapped = false;
      for (let i = 0; i < a.length - 1; i++) {
        if (getValue(a[i].image) > getValue(a[i + 1].image)) {
          swapped = true;
          let temp = a[i];
          a[i] = a[i + 1];
          a[i + 1] = temp;
        }
      }
    } while (swapped);
    return a;
  },

  getTotal: arr => {
    return arr.reduce((previousVal, currentVal) => {
      return (
        parseInt(previousVal) +
        parseInt(currentVal.price.replace(/[,$]/g, "")) * currentVal.quantity
      );
    }, 0);
  },

  getTotalQty: arr => {
    return arr.reduce((previousVal, currentVal) => {
      return previousVal + currentVal.quantity;
    }, 0);
  },
  white: url => {
    return url.replace(/DarkGray/gi, "White");
  },
  lightBrownGray: url => {
    return url.replace(
      /DarkGray_Center_0_0_490x490/gi,
      "LightBrownGray_Center_0_0_150x150"
    );
  },
  highRes: url => {
    return url.replace(/490/gi, "800");
  },
  superRes: url => {
    return url.replace(/490/gi, "2400");
  }
};
