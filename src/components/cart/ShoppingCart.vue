<template>
  <div class="container py-4">
    <h2 class="mb-4 fw-bold">Shopping Cart</h2>

    <!-- Empty Cart State -->
    <div v-if="cartItems.length == 0" class="text-center py-5">
      <i class="bi bi-cart-x display-1 text-muted"></i>
      <h3 class="mt-3">Your cart is empty</h3>
      <p class="text-muted mb-4">Add some lessons to get started</p>
      <router-link to="/lessons" class="btn btn-primary"> Browse Lessons </router-link>
    </div>

    <!-- Cart Items -->
    <div v-else class="row">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body">
            <div class="cart-items">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="cart-item p-3 mb-3 bg-light rounded"
              >
                <cartItem :item="item" @remove="removeFromCart" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Checkout Section -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-4">Checkout</h5>
            <form @submit.prevent="handleCheckout">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  v-model="checkoutForm.name"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label">Phone</label>
                <input
                  type="tel"
                  v-model="checkoutForm.phone"
                  class="form-control"
                  required
                />
              </div>
              <div class="d-grid gap-2">
                <div class="d-flex justify-content-between mb-3">
                  <span>Total:</span>
                  <span class="fw-bold">${{ totalPrice }}</span>
                </div>
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-credit-card me-2"></i>
                  Checkout
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
import cartItem from "./CartItem.vue";
export default {
  components: { cartItem },
  data() {
    return {
      cartItems: [
        {
          id: 1,
          subject: "Math",
          location: "London",
          price: 140,
          spaces: 5,
          quantity: 1,
          icon: "bi bi-calculator",
        },
        {
          id: 2,
          subject: "English",
          location: "London",
          price: 120,
          spaces: 5,
          quantity: 1,
          icon: "bi bi-translate",
        },
        {
          id: 3,
          subject: "Physical Education",
          location: "Manchester",
          price: 150,
          spaces: 3,
          quantity: 1,
          icon: "bi bi-bicycle",
        },
      ],
      checkoutForm: {
        name: "",
        phone: "",
      },
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price, 0);
    },
  },
  methods: {
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id);
    },
    handleCheckout() {
      // Handle checkout logic here
      console.log("Checkout:", {
        items: this.cartItems,
        customer: this.checkoutForm,
        total: this.totalPrice,
      });
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
}

.subject-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  border-radius: 12px;
}

.btn-outline-danger {
  border-width: 1px;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}

@media (max-width: 992px) {
  .col-lg-4 {
    margin-top: 2rem;
  }
}
</style>
