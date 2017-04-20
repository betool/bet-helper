export default {
  getCurrentTime: () => new Date().valueOf(),
  parseJson: (str) => {
    let result = null;
    try {
      result = JSON.parse(str);
    } catch (e) {
      // continue
    }
    return result;
  },
  stringifyJson: (obj) => {
    let result = null;
    try {
      result = JSON.stringify(obj);
    } catch (e) {
      // continue
    }
    return result;
  },
  random: (min, max) => {
    if (min === max) {
      return min;
    }

    return Math.round((Math.random() * (max - min)) + min);
  },

  contentLoaded: (win, fn) => {
    let done = false;
    let top = true;

    const doc = win.document;
    const root = doc.documentElement;

    const add = doc.addEventListener ? 'addEventListener' : 'attachEvent';
    const rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent';
    const pre = doc.addEventListener ? '' : 'on';

    function init (e) {
      if ('readystatechange' === e.type && 'complete' !== doc.readyState) {
        return;
      }

      ('load' === e.type ? win : doc)[rem](pre + e.type, init, false);

      if (!done) {
        done = true;
        fn.call(win, e.type || e);
      }
    }

    function poll () {
      try {
        root.doScroll('left');
      } catch (e) {
        setTimeout(poll, 50);
        return;
      }

      init('poll');
    }

    if ('complete' === doc.readyState) {
      fn.call(win, 'lazy');
    } else {
      if (doc.createEventObject && root.doScroll) {
        try {
          top = !win.frameElement;
        } catch (e) {
          // continue
        }

        if (top) {
          poll();
        }
      }

      doc[add](`${pre}DOMContentLoaded`, init, false);
      doc[add](`${pre}readystatechange`, init, false);
      win[add](`${pre}load`, init, false);
    }
  },
};
