# Media Essentials

### Introduction
This custom module is an attempt to bundle the configuration and installation of a workable media implementation for reusable images out of the box in Drupal. The goal is an easy starting point for creating and reusing media elements. It is based on a slimmed-down version of [thunder_media](https://github.com/BurdaMagazinOrg/thunder-distribution/tree/develop/modules/thunder_media).

Currently we cover the following use-cases:

- Multi-Upload of images
- Combining images to a gallery

### Installation
Assuming that you are managing your site with Composer. It has been tested with sites generated via [Composer template for Drupal projects](https://github.com/drupal-composer/drupal-project).

1. `cd` to the root of your project, where your composer.json lives.
2. Add or append to the following sections to your composer.json:

```
    "repositories": [
        {
            "type": "composer",
            "url": "https://packages.drupal.org/8"
        },
        {
            "type": "package",
            "package": {
                "name": "enyo/dropzone",
                "version": "4.3.0",
                "type": "drupal-library",
                "dist": {
                    "url": "https://github.com/enyo/dropzone/archive/v4.3.0.zip",
                    "type": "zip"
                },
                "require": {
                    "composer/installers": "^1.2.0"
                }
            }
        }
    ],
    "extra": {
        "installer-paths": {
            // ... make sure the following line is in your installer paths section...
            "web/libraries/{$name}": ["type:drupal-library"],
        }
    }
```
3. `composer require drupal/media_entity_image drupal/media_entity drupal/focal_point drupal/entity_browser drupal/ctools drupal/inline_entity_form drupal/dropzonejs_eb_widget enyo/dropzone`
4. `cd web`
5. `drush en media_essentials`
6. `drush cr`

### Configuration
The media ecosystem in Drupal 8 can be conceptually a bit confusing. Consider these instructions relevant as of Drupal 8.3, but it's not clear how they will change when media entities are added in 8.4.

The standard use case for media is to add a reusable media field to a content type. To do that, you start by creating an entity_reference field on a content type, choosing "Other" in the dropdown. After you name your field, you will be able to choose "Media" as the type of the reference field. As you configure the field, you can select the media bundle (in this case, "image" is provided upon install). After the field is created, head to the "Manage form display" screen so that you can configure the field widget. Select "Entity browser", then click the settings icon on the right and update the entity display plugin to "Rendered entity" and change the display plugin configuration to "thumbnail". You can also select the "Show widget details as open by default" option if that's your preference. Finally, head to the "Manage display" form and configure the display settings for the rendered entity. If you choose "Thumbnail" as the format, you can then configure which image style to output, which is likely the standard use case. This workflow is a bit confusing, however, and is likely to change in future implementations.

This suite of media modules and configuration easily integrates with the [entity_embed module](https://www.drupal.org/project/entity_embed), which you can use to select an image from the gallery, if that's needed on the project.
