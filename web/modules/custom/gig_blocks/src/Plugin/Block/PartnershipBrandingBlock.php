<?php

namespace Drupal\gig_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a block with the partnership branding.
 *
 * @Block(
 *   id = "gig_blocks_partnership_branding",
 *   admin_label = @Translation("Partnership Branding"),
 *   category = @Translation("Gig custom blocks"),

 * )
 */
class PartnershipBrandingBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
$markup = <<<EOT
<div class="partnership--branding"></div>
EOT;
    return [ '#markup' => $markup ];
  }
}
