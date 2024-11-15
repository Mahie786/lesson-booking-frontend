<template>
  <div class="cart-item-container">
    <div class="d-flex justify-content-between align-items-center flex-wrap">
      <!-- Left: Subject Info -->
      <div class="d-flex align-items-center subject-info">
        <div class="subject-icon me-3">
          <i :class="item?.icon" class="fs-3"></i>
        </div>
        <div>
          <h5 class="mb-1">{{ item.subject }}</h5>
          <div class="text-muted small mb-1">
            <i class="bi bi-geo-alt me-1"></i>
            {{ item.location }}
          </div>
          <div class="text-muted small">
            <i class="bi bi-person me-1"></i>
            {{ availableSpaces }} remaining
          </div>
        </div>
      </div>

      <!-- Right: Quantity, Price, Remove -->
      <div class="controls-section">
        <!-- Quantity Controls -->
        <div class="quantity-wrapper me-4">
          <label class="form-label small text-muted mb-2">Quantity:</label>
          <div class="quantity-control d-flex align-items-center">
            <button
              @click="updateQuantity(item.quantity - 1)"
              class="btn btn-outline-secondary btn-sm"
              :disabled="item.quantity <= 1"
              title="Decrease quantity"
            >
              <i class="bi bi-dash"></i>
            </button>
            <span class="quantity-display mx-3">{{ item.quantity }}</span>
            <button
              @click="updateQuantity(item.quantity + 1)"
              class="btn btn-outline-secondary btn-sm"
              :disabled="item.quantity >= item.spaces"
              title="Increase quantity"
            >
              <i class="bi bi-plus"></i>
            </button>
          </div>
          <!-- <small v-if="item.quantity >= item.spaces" class="text-danger mt-1 d-block">
            Maximum available reached
          </small> -->
        </div>

        <!-- Price and Remove -->
        <div class="price-remove-section text-end">
          <div class="price-section mb-2">
            <div class="fw-bold">£{{ totalPrice }}</div>
            <small class="text-muted" v-if="item.quantity > 1">
              £{{ item.price }} each
            </small>
          </div>
          <button
            @click="removeItem"
            class="btn btn-outline-danger btn-sm"
            title="Remove from cart"
          >
            <i class="bi bi-trash me-1"></i>
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",

  props: {
    item: {
      type: Object,
      required: true,
      validator: (obj) => {
        return ["id", "subject", "location", "price", "spaces", "quantity", "icon"].every(
          (prop) => prop in obj
        );
      },
    },
  },

  computed: {
    totalPrice() {
      return this.item.price * this.item.quantity;
    },

    availableSpaces() {
      const remaining = this.item.spaces - this.item.quantity;
      return `${remaining} space${remaining !== 1 ? "s" : ""}`;
    },
  },

  methods: {
    updateQuantity(quantity) {
      this.$store.dispatch("cart/updateQuantity", {
        lessonId: this.item.id,
        quantity: quantity,
      });
    },

    removeItem() {
      this.$emit("remove", this.item);
    },
  },
};
</script>

<style scoped>
.cart-item-container {
  transition: all 0.3s ease;
}

.cart-item-container:hover {
  background-color: #f8f9fa;
}

.subject-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #007bff, #0056b3);
  border-radius: 12px;
  color: white;
  transition: transform 0.2s ease;
}

.subject-icon:hover {
  transform: scale(1.05);
}

.quantity-control {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 2px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.quantity-control button {
  width: 28px;
  height: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  transition: all 0.2s ease;
}

.quantity-control button:hover:not(:disabled) {
  background-color: #f8f9fa;
  transform: translateY(-1px);
}

.quantity-control button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-display {
  min-width: 24px;
  text-align: center;
  font-weight: 500;
  user-select: none;
}

.btn-outline-danger {
  border-width: 1px;
  transition: all 0.2s ease;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
  transform: translateY(-1px);
}

.controls-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.price-section {
  text-align: right;
}

/* Responsive Design */
@media (max-width: 768px) {
  .cart-item-container {
    padding: 1rem;
  }

  .subject-info {
    margin-bottom: 1rem;
    width: 100%;
  }

  .controls-section {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .quantity-wrapper {
    margin-right: 0;
  }

  .price-remove-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price-section {
    margin-bottom: 0;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cart-item-container {
  animation: fadeIn 0.3s ease-out;
}
</style>
