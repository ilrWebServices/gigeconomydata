(function ($) {
  Drupal.behaviors.footnotesCombined = {
    attach: function (context, settings) {
      var footnotes_html = '';
      var $i = 1;
      $('li.footnote').each(function () {
        var $link = $(this).find('a');
        var $href = $link.attr('href');
        $link.text($i+'.'); // Update the footnote li
        $('a'+$href).text($i); // Update the link text
        footnotes_html += $(this)[0].outerHTML;
        $(this).remove();
        $i++;
      });

      if (footnotes_html) { // Make sure the footnotes are not empty
        $('#footnotes-combined').prepend(
          '<ul class="footnotes footnotes--combined">'
          + footnotes_html + '</ul>');
        // Clean up the old footnotes lists
        $('ul.footnotes').not('.footnotes--combined').remove();
      }
    }
  };
})(jQuery);
