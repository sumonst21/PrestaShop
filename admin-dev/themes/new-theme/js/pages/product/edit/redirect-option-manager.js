/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 */

import EntitySearchInput from "@components/entity-search-input";

const {$} = window;

export default class RedirectOptionManager {
  constructor($redirectTypeInput, $redirectTargetInput) {
    this.$redirectTypeInput = $redirectTypeInput;
    this.$redirectTargetInput = $redirectTargetInput;
    this.$redirectTargetRow = this.$redirectTargetInput.closest('.form-group');
    this.$redirectTargetLabel = $('.form-control-label', this.$redirectTargetRow).first();
    this.buildAutoCompleteSearchInput();
    this.watchRedirectType();
  }

  watchRedirectType() {
    this.lastSelectedType = this.$redirectTypeInput.val();
    this.$redirectTypeInput.change(() => {
      const redirectType = this.$redirectTypeInput.val();
      switch (redirectType) {
        case '301-category':
        case '302-category':
          this.entitySearchInput.setRemoteUrl(this.$redirectTargetInput.data('categorySearchUrl'));
          this.$redirectTargetInput.prop('placeholder', this.$redirectTargetInput.data('categoryPlaceholder'));
          this.$redirectTargetLabel.html(this.$redirectTargetInput.data('categoryLabel'));
          // If previous type was not a category we reset the selected value
          if (this.lastSelectedType !== '301-category' && this.lastSelectedType !== '302-category') {
            this.entitySearchInput.setValue(null);
          }
          this.$redirectTargetRow.show();
          break;
        case '301-product':
        case '302-product':
          this.entitySearchInput.setRemoteUrl(this.$redirectTargetInput.data('productSearchUrl'));
          this.$redirectTargetInput.prop('placeholder', this.$redirectTargetInput.data('productPlaceholder'));
          this.$redirectTargetLabel.html(this.$redirectTargetInput.data('productLabel'));
          // If previous type was not a category we reset the selected value
          if (this.lastSelectedType !== '301-product' && this.lastSelectedType !== '302-product') {
            this.entitySearchInput.setValue(null);
          }
          this.$redirectTargetRow.show();
          break;
        case '404':
          this.entitySearchInput.setValue(null);
          this.$redirectTargetRow.hide();
          break;
      }
      this.lastSelectedType = this.$redirectTypeInput.val();
    });
  }

  buildAutoCompleteSearchInput() {
    this.entitySearchInput = new EntitySearchInput(this.$redirectTargetInput);
  }

  selectedValue(entity) {
    let value = entity.id;
    if (Object.prototype.hasOwnProperty.call(entity, 'id_product_attribute') && entity.id_product_attribute) {
      value = `${value},${entity.id_product_attribute}`;
    }

    return value;
  }
}
