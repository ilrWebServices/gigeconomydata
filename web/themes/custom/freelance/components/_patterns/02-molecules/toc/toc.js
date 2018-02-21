(function ($, Drupal, _) {
  Drupal.behaviors.toc = {
    // toc - Table of Contents ~ https://github.com/ghiculescu/jekyll-table-of-contents
    attach: function (context) {
      /**
       * Which heading elements to turn into TOC items
       * @type {Array<String>}
       */
      var headingsToUse = ['h2:not(.component__teaser-list *)','h3:not(.component__teaser-list *)'];
      var minimumHeaders = 2;
      /** @type {Array<String>} */
      var ids = [];
      /** @type {Array<JQuery>} */
      var headings = [];

      /**
       * Copyright 2012, Digital Fusion
       * Licensed under the MIT license.
       * http://teamdf.com/jquery-plugins/license/
       *
       * @author Sam Sehnert
       * @desc A small plugin that checks whether elements are within
       *     the user visible viewport of a web browser.
       *     only accounts for vertical position, not horizontal.
       * @param {Boolean} partial - If false, triggers when entire item is visible, if true, then if top is visible.
       * @return {Boolean} If the item is in the viewport.
       */
      $.fn.visible = function (partial) {
        var $t = $(this);
        var $w = $(window);
        var viewTop = $w.scrollTop();
        var viewBottom = viewTop + $w.height();
        var _top = $t.offset().top;
        var _bottom = _top + $t.height();
        var compareTop = partial === true ? _bottom : _top;
        var compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
      };

      function isIdUsed(newId) {
        return ids.some(function (id) {
          return id === newId;
        });
      }

      function slugify(string) {
        return string.toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
          .replace(/\-\-+/g, '-')         // Replace multiple - with single -
          .replace(/^-+/, '')             // Trim - from start of text
          .replace(/-+$/, '');            // Trim - from end of text
      }

      var $toc = $('.js-toc.toc--not-ready', context);
      var $tocSource = $('.js-toc-source', context).first();
      var $tocParent = $toc.parent();

      // When an item becomes `position: fixed` and has a % width, it tends to become bigger as it's parent is no longer the page container, but is now the body. This fixes that.
      function setTocWidth() {
        $toc.width($tocParent.width());
      }

      setTocWidth();

      $tocSource.find(headingsToUse.join(', ')).each(function (i) {
        var $item = $(this);
        var slug = slugify($item.text());
        if (isIdUsed(slug)) {
          slug = slug + '-' + i;
        }
        ids.push(slug);
        headings.push($item);
        $item.attr('id', slug);
      });

      $('.toc__inner', $toc).toc({
        noBackToTopLinks: true,
        title: '',
        minimumHeaders: minimumHeaders,
        headers: headingsToUse.map(function (item) {
          return '.js-toc-source ' + item;
        }).join(', '),
        classes: {
          list: 'toc__list',
          item: 'toc__item'
        }
      });

      if ($toc.find('.toc__item--active').length === 0) {
        $toc.find('.toc__item').first().addClass('toc__item--active');
      }

      if ($toc.find('.toc__item').length > 0) {
        $toc.removeClass('toc--not-ready');
        var tocTop = $toc.offset().top;
        var tocHeight = $toc.height();
        var tocOffset = tocTop - tocHeight;
        var tocSourceTop = $tocSource.offset().top;
        var tocSourceHeight = $tocSource.height();
        var sourceOffsetBottom = tocSourceTop + tocSourceHeight;

        // The `tocHeight` is initially the size w/o `.toc__item`s, so we need to get it after toc is created but there's no event to tap into. So we keep checking until it's bigger and then stop.
        var checker = setInterval(function () {
          var newTocHeight = $toc.height();
          if (newTocHeight > tocHeight) {
            tocHeight = newTocHeight;
            tocOffset = tocTop - tocHeight;
            clearInterval(checker);
          }
        }, 1000);

        // Trigger fixed positioning - can't use debouncing as even a very low number doesn't "feel" right; I believe it waits that long till scroll events stop firing and since you can continuously scroll it makes it feel laggy.
        window.addEventListener('scroll', function (e) {
          var scrolledDistance = $('html').scrollTop() || $('body').scrollTop();

          if (tocOffset < scrolledDistance) {
            $toc.addClass('toc--fixed');
          } else {
            $toc.removeClass('toc--fixed');
          }

          var isAtBottom = sourceOffsetBottom - tocHeight - 25 < scrolledDistance;
          if (isAtBottom) {
            $toc.addClass('toc--stuck-to-bottom');
          } else {
            $toc.removeClass('toc--stuck-to-bottom');
          }
        });

        // Update current heading in TOC list
        window.addEventListener('scroll', _.debounce(function (e) {
          // like `forEach` but let's us stop after we find the first one
          headings.every(function ($heading) {
            if ($heading.visible()) {
              $toc.find('.toc__item--active').removeClass('toc__item--active');
              $toc.find('a[href="#' + $heading.attr('id') + '"]').parent().addClass('toc__item--active');
              return false;
            }
            return true;
          });

        }, 100));

        window.addEventListener('resize', _.debounce(setTocWidth, 10));

      }


    }
  };
}(jQuery, Drupal, _));
