// Global javascript (loaded on all pages in Pattern Lab and Drupal)
// Should be used sparingly because javascript files can be used in components
// See https://github.com/fourkitchens/freelance/wiki/Drupal-Components#javascript-in-drupal for more details on using component javascript in Drupal.

// Typekit Example
try {
  Typekit.load({ async: true });
}
catch (e) {
  alert('An error has occurred: ' + e.message);
}

// WA fixes (put them here to not create another file)
// remove redundent Aria roles
$('main').removeAttr('role');
$('article').removeAttr('role');
$('nav').removeAttr('role');
$('aside').removeAttr('role');

// Add aria-label to non-distinguishable landmarks
$('nav.sub-nav').setAttr('aria-label','sub navigation');

// Add aria-label to input field with no label
$('input#edit-combine').setAttr('aria-label','Search for');
