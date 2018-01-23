<?php

namespace Drupal\gig_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a block with a copyright statement.
 *
 * @Block(
 *   id = "gig_blocks_copyright",
 *   admin_label = @Translation("Copyright"),
 *   category = @Translation("Gig custom blocks"),

 * )
 */
class CopyrightBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
$markup = <<<EOT
<div class="copyright"></div>
EOT;
    return [ '#markup' => $markup ];
  }
}
