[![Four Kitchens](https://img.shields.io/badge/4K-Four%20Kitchens-35AA4E.svg)](https://fourkitchens.com/)

# freelance: Pattern Lab + Drupal 8

Component-driven prototyping tool using [Pattern Lab v2](http://patternlab.io/) automated via Gulp/NPM. Also serves as a starterkit Drupal 8 theme.

## Requirements

  1. [Node (we recommend NVM)](https://github.com/creationix/nvm)
  2. [Gulp](http://gulpjs.com/)
  3. [Composer](https://getcomposer.org/)
  4. Optional: [Yarn](https://github.com/yarnpkg/yarn)

## Quickstart (freelance Standalone)
freelance supports both NPM and YARN.

Install with NPM:
`composer create-project fourkitchens/freelance --stability dev --no-interaction freelance && cd freelance && npm install`

Install with Yarn:
`composer create-project fourkitchens/freelance --stability dev --no-interaction freelance && cd freelance && yarn install`

## Drupal-specific installation

### In a Composer-based Drupal install (recommended)

  1. `composer require fourkitchens/freelance`
  2. Enable freelance and its dependencies `drush en freelance components unified_twig_ext -y`
  3. **Optional**: Create cloned theme `drush freelance "THEME NAME"` (You may need to run `drush cc drush` to clear the drush cache. Also, you can run `drush help freelance` for other available options)
  4. If you created a cloned theme, `cd web/themes/custom/THEME_NAME/`. If not, `cd web/themes/contrib/freelance/`
  5. `npm install` or `yarn install`

If you're not using a Composer-based Drupal install (e.g. tarball download from drupal.org) installation [instructions can be found on the Wiki](https://github.com/fourkitchens/freelance/wiki/Installation).

Troubleshooting Installation: See [Drupal Installation FAQ](https://github.com/fourkitchens/freelance/wiki/Installation#drupal-installation-faq).

## Starting Pattern Lab and watch task

The `start` command spins up a local server, compiles everything (runs all required gulp tasks), and watches for changes.

  1. `npm start` or `yarn start`

  ---

## Highlighted Features

<table><tbody>
<tr><td>Lightweight</td><td>✔</td><td>freelance is focused on being as lightweight as possible.</td></tr>
<tr><td>SVG sprite support </td><td><strong>✔</strong></td><td>Automated support for creating SVG sprites mixins/classes.</td></tr>
<tr><td>Stock Drupal templates </td><td><strong>✔</strong></td><td>Templates from Stable theme - see /templates directory</td></tr>
<tr><td>Stock Components </td><td><strong>✔</strong></td><td>with Drupal support built-in (https://github.com/fourkitchens/freelance#freelances-built-in-components-with-drupal-support)</td></tr>
<tr><td>Performance Testing </td><td><strong>✔</strong></td><td>Support for testing via Google PageSpeed Insights and WebPageTest.org (https://github.com/fourkitchens/freelance/wiki/Gulp-Config#performance-testing)</td></tr>
<tr><td>Automated Github Deployment </td><td><strong>✔</strong></td><td>Deploy your Pattern Lab instance as a Github page (https://github.com/fourkitchens/freelance/wiki/Gulp-Config#deployment)</td></tr>
</tbody></table>

<h3 id="components">freelance's Built in Components with Drupal support</h3>
Forms, tables, video, accordion, cards, breadcrumbs, tabs, pager, status messages, grid

View a [demo of these default freelance components](https://fourkitchens.github.io/freelance/pattern-lab/public/).

## Documentation
Documentation is currently provided in [the Wiki](https://github.com/fourkitchens/freelance/wiki). Here are a few basic links:

#### General Orientation

See [Orientation](https://github.com/fourkitchens/freelance/wiki/Orientation)

#### For Designers (Prototyping)

See [Designers](https://github.com/fourkitchens/freelance/wiki/For-Designers)

#### For Drupal 8 Developers

See [Drupal Usage](https://github.com/fourkitchens/freelance/wiki/Drupal-Usage)

#### Gulp Configuration

See [Gulp Config](https://github.com/fourkitchens/freelance/wiki/Gulp-Config)
