<template>
  <div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold mb-0">Shopping Cart</h2>
      <button v-if="hasItems" @click="clearCart" class="btn btn-outline-danger btn-sm">
        <i class="bi bi-trash me-2"></i>Clear Cart
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Empty Cart State -->
    <div v-else-if="!hasItems" class="text-center py-5">
      <i class="bi bi-cart-x display-1 text-muted"></i>
      <h3 class="mt-3">Your cart is empty</h3>
      <p class="text-muted mb-4">Add some lessons to get started</p>
      <router-link to="/lessons" class="btn btn-primary">
        <i class="bi bi-book me-2"></i>Browse Lessons
      </router-link>
    </div>

    <!-- Cart Items -->
    <div v-else class="row">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body">
            <div class="cart-items">
              <div
                v-for="item in sortedCartItems"
                :key="item.id"
                class="cart-item p-3 mb-3 bg-light rounded"
              >
                <cartItem
                  :item="item"
                  @remove="handleRemoveItem"
                  @update-quantity="handleUpdateQuantity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Checkout Section -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-4">Order Summary</h5>

            <!-- Price Summary -->
            <div class="price-summary mb-4">
              <!-- <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Subtotal</span>
                <span>{{ formattedCartTotal }}</span>
              </div> -->
              <!-- <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">VAT (20%)</span>
                <span>{{ formattedTax }}</span>
              </div> -->
              <!-- <hr /> -->
              <div class="d-flex justify-content-between mb-3">
                <span class="fw-bold">Total</span>
                <span class="fw-bold">{{ cartTotal }}</span>
              </div>
            </div>

            <!-- Checkout Form -->
            <form @submit.prevent="handleCheckout">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  v-model="checkoutForm.name"
                  class="form-control"
                  :class="{ 'is-invalid': errors.name }"
                  required
                />
                <div class="invalid-feedback">{{ errors.name }}</div>
              </div>

              <div class="mb-3">
                <label class="form-label">Phone</label>
                <input
                  type="tel"
                  v-model="checkoutForm.phone"
                  class="form-control"
                  :class="{ 'is-invalid': errors.phone }"
                  required
                />
                <div class="invalid-feedback">{{ errors.phone }}</div>
              </div>

              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="loading || !isFormValid"
                >
                  <i class="bi bi-credit-card me-2"></i>
                  Checkout ({{ cartItemCount }} items)
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import cartItem from "./CartItem.vue";

export default {
  name: "CartView",

  components: {
    cartItem,
  },

  data() {
    return {
      checkoutForm: {
        name: "",
        phone: "",
      },
      errors: {
        name: "",
        phone: "",
      },
      loading: false,
    };
  },

  computed: {
    ...mapState("cart", ["error"]),
    ...mapGetters("cart", ["sortedCartItems", "hasItems", "cartItemCount", "cartTotal"]),

    isFormValid() {
      return (
        this.checkoutForm.name &&
        this.checkoutForm.phone &&
        !this.errors.name &&
        !this.errors.phone
      );
    },
  },

  methods: {
    ...mapActions("cart", ["removeFromCart", "clearCart"]),

    async handleCheckout() {
      if (!this.validateForm()) return;

      try {
        const customerInfo = {
          name: this.checkoutForm.name,
          phone: this.checkoutForm.phone,
          checkoutDate: new Date().toISOString(),
        };

        const result = await this.$store.dispatch("cart/checkout", customerInfo);

        if (result.success) {
          // Show success message
          this.$router.push({
            name: "checkout-success",
            params: { orderId: result.order.orderId },
          });
        } else {
          // Handle error
          console.error("Checkout failed:", result.error);
        }
      } catch (error) {
        console.error("Checkout error:", error);
      }
    },
    validateForm() {
      let isValid = true;
      this.errors = {
        name: "",
        phone: "",
      };

      // Name validation
      if (!this.checkoutForm.name.trim()) {
        this.errors.name = "Name is required";
        isValid = false;
      } else if (this.checkoutForm.name.length < 2) {
        this.errors.name = "Name must be at least 2 characters";
        isValid = false;
      }

      // Phone validation
      const phoneRegex = /^[0-9]{10,}$/;
      if (!this.checkoutForm.phone.trim()) {
        this.errors.phone = "Phone number is required";
        isValid = false;
      } else if (!phoneRegex.test(this.checkoutForm.phone)) {
        this.errors.phone = "Please enter a valid phone number";
        isValid = false;
      }

      return isValid;
    },

    async handleRemoveItem(item) {
      try {
        await this.removeFromCart(item.id);
      } catch (error) {
        console.error("Failed to remove item:", error);
      }
    },

    async handleCheckout() {
      if (!this.validateForm()) return;

      this.loading = true;
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const order = {
          items: this.sortedCartItems.map((item) => item.id),
          name: this.checkoutForm.name,
          phone: this.checkoutForm.phone,
          total: this.cartTotalWithTax,
          orderDate: new Date().toISOString(),
        };

        console.log("Order placed:", order);

        // Clear cart after successful checkout
        await this.clearCart();

        // Reset form
        this.checkoutForm = {
          name: "",
          phone: "",
        };

        // Show success message or redirect
        // this.$router.push("/checkout-success");

        alert("Order placed successfully!");
      } catch (error) {
        console.error("Checkout failed:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.cart-item {
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.cart-item:hover {
  background-color: #f8f9fa !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.price-summary {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.btn-primary {
  background: linear-gradient(45deg, #007bff, #0056b3);
  border: none;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(45deg, #0056b3, #004085);
  transform: translateY(-2px);
}

.btn-outline-danger {
  border-width: 1px;
  transition: all 0.3s ease;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 992px) {
  .col-lg-4 {
    margin-top: 2rem;
  }
}
</style>
