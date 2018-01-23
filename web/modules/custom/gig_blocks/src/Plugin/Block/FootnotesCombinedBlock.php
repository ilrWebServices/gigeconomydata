<?php

namespace Drupal\gig_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a placeholder block for the combined footnotes.
 *
 * @Block(
 *   id = "gig_blocks_footnotes_combined",
 *   admin_label = @Translation("Combined footnotes"),
 *   category = @Translation("Gig custom blocks"),

 * )
 */
class FootnotesCombinedBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
$markup = <<<EOT
<div id="footnotes-combined"></div>
EOT;
    return [ '#markup' => $markup ];
  }
}
