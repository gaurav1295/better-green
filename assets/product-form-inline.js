if (!customElements.get('product-form-inline')) {
    customElements.define(
      'product-form-inline',
      class ProductFormInline extends HTMLElement {
        constructor() {
          super();
  
          this.form = this.querySelector('form');
          this.form.querySelector('[name=id]').disabled = false;
          this.plusButtons = this.form.querySelectorAll('.plus-button');
          this.minusButtons = this.form.querySelectorAll('.minus-button');
          this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
          this.plusButtons.forEach(button => button.addEventListener('click', this.onPlusButtonClick.bind(this)));
          this.minusButtons.forEach(button => button.addEventListener('click', this.onMinusButtonClick.bind(this)));
          this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');

          this.submitButton = this.querySelector('[type="submit"]');
  
          if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');
  
          this.hideErrors = this.dataset.hideErrors === 'true';
        }
  
        onSubmitHandler(evt) {
          evt.preventDefault();
          // check if localstorage has delivery-date  and delivery-pincode
          const storedDeliveryDate = localStorage.getItem('delivery-date');
          const storedDeliveryPincode = localStorage.getItem('delivery-pincode');
          if (!storedDeliveryDate) {
            return 
          } 
          if (!storedDeliveryPincode) {
            document.getElementById('modal-overlay').style.display = 'flex';
            return
          }
          
          if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
  
          this.handleErrorMessage();
  
          this.submitButton.setAttribute('aria-disabled', true);
          this.submitButton.classList.add('loading');
          this.querySelector('.loading__spinner').classList.remove('hidden');
  
          const config = fetchConfig('javascript');
          config.headers['X-Requested-With'] = 'XMLHttpRequest';
          delete config.headers['Content-Type'];
  
          const formData = new FormData(this.form);
          if (this.cart) {
            formData.append(
              'sections',
              this.cart.getSectionsToRender().map((section) => section.id)
            );
            formData.append('sections_url', window.location.pathname);
            this.cart.setActiveElement(document.activeElement);
          }

          config.body = formData;
          fetch(`${routes.cart_add_url}`, config)
            .then((response) => {
              return response.json()
            })
            .then((response) => {
              if (response.status) {
                publish(PUB_SUB_EVENTS.cartError, {
                  source: 'product-form',
                  productVariantId: formData.get('id'),
                  errors: response.errors || response.description,
                  message: response.message,
                });
                this.handleErrorMessage(response.description);
  
                const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
                if (!soldOutMessage) return;
                this.submitButton.setAttribute('aria-disabled', true);
                this.submitButton.querySelector('span').classList.add('hidden');
                soldOutMessage.classList.remove('hidden');
                this.error = true;
                return;
              } else if (!this.cart) {
                window.location = window.routes.cart_url;
                return;
              }
  
              if (!this.error)
                publish(PUB_SUB_EVENTS.cartUpdate, {
                  source: 'product-form',
                  productVariantId: formData.get('id'),
                  cartData: response,
                });
              this.error = false;
              const quickAddModal = this.closest('quick-add-modal');
              if (quickAddModal) {
                document.body.addEventListener(
                  'modalClosed',
                  () => {
                    setTimeout(() => {
                      this.cart.renderContents(response);
                    });
                  },
                  { once: true }
                );
                quickAddModal.hide(true);
              } else {
                this.cart.renderContents(response);
              }

              // this.fetchProductGrid(response.id)
            })
            .catch((e) => {
              console.error(e);
            })
            .finally(() => {
              this.submitButton.classList.remove('loading');
              if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
              if (!this.error) this.submitButton.removeAttribute('aria-disabled');
              this.querySelector('.loading__spinner').classList.add('hidden');
              window.location.reload();
            });
        }

        fetchProductGrid(productId) {
          const sectionsUrl = window.location.pathname;
          const sectionId = 'main-collection-product-grid'; // Section ID for the product grid in Dawn theme

          const config = {
              method: 'GET',
              headers: {
                  'X-Requested-With': 'XMLHttpRequest'
              }
          };

          fetch(`${sectionsUrl}?sections=${sectionId}`, config)
              .then((response) => {
                  if (!response.ok) {
                      throw new Error('Network response was not ok ' + response.statusText);
                  }
                  return response.json();
              })
              .then((html) => {
                  const sectionHtmlFromResponse = html['main-collection-product-grid']

                  const parser = new DOMParser();
                  const doc = parser.parseFromString(sectionHtmlFromResponse, 'text/html');
                  console.log(doc)

                  // console.log()
                  // const elementToUpdate = document.querySelector(`[data-product-id="${productId}"]`);
                  // console.log(elementToUpdate)
                  // const 
                  // const newProductGrid = doc.querySelector(`#shopify-section-${sectionId}`);

                  // const currentProductGrid = document.querySelector(`#shopify-section-${sectionId}`);
                  // if (currentProductGrid && newProductGrid) {
                  //     currentProductGrid.innerHTML = newProductGrid.innerHTML;
                  // }
              })
              .catch((e) => {
                  console.error('Error fetching product grid:', e);
              });
        }
  
        onPlusButtonClick(evt) {
          evt.preventDefault();
          this.onSubmitHandler(evt);
        }
  
        onMinusButtonClick(evt) {
          evt.preventDefault();
          let quantity = parseInt(this.quantityInput.value);
          if (quantity > 1) {
            quantity--;
            this.quantityInput.value = quantity;
            this.onSubmitHandler(evt); // Call onSubmitHandler after updating quantity
          }
        }
  
        handleErrorMessage(errorMessage = false) {
          if (this.hideErrors) return;
  
          this.errorMessageWrapper =
            this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
          if (!this.errorMessageWrapper) return;
          this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');
  
          this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);
  
          if (errorMessage) {
            this.errorMessage.textContent = errorMessage;
          }
        }
      }
    );
  }
  