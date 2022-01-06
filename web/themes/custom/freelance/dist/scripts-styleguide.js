'use strict';

// Global javascript (loaded on all pages in Pattern Lab and Drupal)
// Should be used sparingly because javascript files can be used in components
// See https://github.com/fourkitchens/freelance/wiki/Drupal-Components#javascript-in-drupal for more details on using component javascript in Drupal.

// Typekit Example
try {
  Typekit.load({ async: true });
} catch (e) {
  alert('An error has occurred: ' + e.message);
}

// WA fixes (put them here to not create another file)
// remove redundent Aria roles
$('main').removeAttr('role');
$('article').removeAttr('role');
$('nav').removeAttr('role');
$('aside').removeAttr('role');

// Add aria-label to non-distinguishable landmarks
$('nav.sub-nav').setAttr('aria-label', 'sub navigation');

// Add aria-label to input field with no label
$('input#edit-combine').setAttr('aria-label', 'Search for');
'use strict';

(function ($, Drupal) {
  Drupal.behaviors.pullquote = {
    attach: function attach(context) {
      var count = 1;
      var $pullquotes = $('span.pullquote', context);
      var $quote, $parent;
      var template = '<aside class="pullquote pullquote--_align_"><p>_quote_</p></aside>';

      function createPullquotes() {
        $pullquotes.each(function () {
          $quote = $(this).text();
          $parent = $(this).closest('p');
          $parent.prepend(template.replace('_quote_', $quote).replace('_align_', isOdd(count) ? 'right' : 'left'));
          count++;
        });
      }

      function isOdd(num) {
        return 'number' !== typeof num ? 'NaN' : !!(num % 2);
      }

      createPullquotes();
    }
  };
})(jQuery, Drupal);
'use strict';

(function ($, Drupal, _) {
  Drupal.behaviors.toc = {
    // toc - Table of Contents ~ https://github.com/ghiculescu/jekyll-table-of-contents
    attach: function attach(context) {
      /**
       * Which heading elements to turn into TOC items
       * @type {Array<String>}
       */
      var headingsToUse = ['h2:not(.component__teaser-list *)', 'h3:not(.component__teaser-list *)'];
      var minimumHeaders = 2;
      /** @type {Array<String>} */
      var ids = [];
      /** @type {Array<JQuery>} */
      var headings = [];
      var paddingInit;

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

        return compareBottom <= viewBottom && compareTop >= viewTop;
      };

      function isIdUsed(newId) {
        return ids.some(function (id) {
          return id === newId;
        });
      }

      function slugify(string) {
        return string.toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
      }

      var $toc = $('.js-toc.toc--not-ready', context);
      var $tocSource = $('.js-toc-source', context).first();
      var $tocParent = $toc.parent();

      // When an item becomes `position: fixed` and has a % width, it tends to become bigger as it's parent is no longer the page container, but is now the body. This fixes that.
      function setTocWidth() {
        if ($toc.css('padding-left') !== undefined) {
          paddingInit = parseInt($toc.css('padding-left'), 10);
        }
        $toc.width($tocParent.width() - 2 * paddingInit);
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
        var tocSourceTop = $tocSource.offset().top;
        var tocSourceHeight = $tocSource.height();
        var sourceOffsetBottom = tocSourceTop + tocSourceHeight;

        // The `tocHeight` is initially the size w/o `.toc__item`s, so we need to get it after toc is created but there's no event to tap into. So we keep checking until it's bigger and then stop.
        var checker = setInterval(function () {
          var newTocHeight = $toc.height();
          if (newTocHeight > tocHeight) {
            tocHeight = newTocHeight;
            tocTop = $toc.position().top;
            clearInterval(checker);
          }
        }, 1000);

        // Trigger fixed positioning - can't use debouncing as even a very low number doesn't "feel" right; I believe it waits that long till scroll events stop firing and since you can continuously scroll it makes it feel laggy.
        window.addEventListener('scroll', function (e) {
          var scrolledDistance = $('html').scrollTop() || $('body').scrollTop();
          if (tocTop < scrolledDistance) {
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
})(jQuery, Drupal, _);
'use strict';

/**
 * @file
 * A JavaScript file containing the main menu functionality (small/large screen)
 *
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth


(function (Drupal) {
  // UNCOMMENT IF DRUPAL.

  Drupal.behaviors.mainMenu = {
    attach: function attach(context) {
      'use strict';

      // Use context instead of document IF DRUPAL.

      var toggle_expand = document.getElementById('toggle-expand');
      var menu = document.getElementById('main-nav');
      var expand_menu = menu.getElementsByClassName('expand-sub');

      // Mobile Menu Show/Hide.
      toggle_expand.addEventListener('click', function (e) {
        toggle_expand.classList.toggle('toggle-expand--open');
        menu.classList.toggle('main-nav--open');
      });

      // Expose mobile sub menu on click.
      for (var i = 0; i < expand_menu.length; i++) {
        expand_menu[i].addEventListener('click', function (e) {
          var menu_item = e.currentTarget;
          var sub_menu = menu_item.nextElementSibling;

          menu_item.classList.toggle('expand-sub--open');
          sub_menu.classList.toggle('main-menu--sub-open');
        });
      }
    }
  };
})(Drupal); // UNCOMMENT IF DRUPAL.
'use strict';

(function () {

  'use strict';

  var el = document.querySelectorAll('.tabs');
  var tabNavigationLinks = document.querySelectorAll('.tabs__link');
  var tabContentContainers = document.querySelectorAll('.tabs__tab');
  var activeIndex = 0;

  /**
   * handleClick
   * @description Handles click event listeners on each of the links in the
   *   tab navigation. Returns nothing.
   * @param {HTMLElement} link The link to listen for events on
   * @param {Number} index The index of that link
   */
  var handleClick = function handleClick(link, index) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      goToTab(index);
    });
  };

  /**
   * goToTab
   * @description Goes to a specific tab based on index. Returns nothing.
   * @param {Number} index The index of the tab to go to
   */
  var goToTab = function goToTab(index) {
    if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
      tabNavigationLinks[activeIndex].classList.remove('is-active');
      tabNavigationLinks[index].classList.add('is-active');
      tabContentContainers[activeIndex].classList.remove('is-active');
      tabContentContainers[index].classList.add('is-active');
      activeIndex = index;
    }
  };

  /**
   * init
   * @description Initializes the component by removing the no-js class from
   *   the component, and attaching event listeners to each of the nav items.
   *   Returns nothing.
   */
  for (var e = 0; e < el.length; e++) {
    el[e].classList.remove('no-js');
  }

  for (var i = 0; i < tabNavigationLinks.length; i++) {
    var link = tabNavigationLinks[i];
    handleClick(link, i);
  }
})();
//# sourceMappingURL=scripts-styleguide.js.map
