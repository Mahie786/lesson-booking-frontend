<template>
  <div class="d-flex justify-content-between align-items-center">
    <!-- Left: Subject Info -->
    <div class="d-flex align-items-center">
      <div class="subject-icon me-3">
        <i :class="item?.icon" class="fs-3"></i>
      </div>
      <div>
        <h5 class="mb-1">{{ item.subject }}</h5>
        <div class="text-muted small">
          <i class="bi bi-geo-alt me-1"></i>
          {{ item.location }}
        </div>
        <div class="text-muted small">
          <i class="bi bi-person me-1"></i>
          {{ item.spaces }} spaces
        </div>
      </div>
    </div>

    <!-- Right: Quantity, Price, Remove -->
    <div class="d-flex align-items-center gap-4">
      <!-- Quantity Controls -->
      <div class="quantity-wrapper">
        <label class="form-label small text-muted mb-2">Quantity:</label>
        <div class="quantity-control d-flex align-items-center">
          <button
            @click="
              $emit('update-quantity', { id: item.id, quantity: item.quantity - 1 })
            "
            class="btn btn-outline-secondary btn-sm"
            :disabled="item.quantity <= 1"
          >
            <i class="bi bi-dash"></i>
          </button>
          <span class="quantity-display mx-3">{{ item.quantity }}</span>
          <button
            @click="
              $emit('update-quantity', { id: item.id, quantity: item.quantity + 1 })
            "
            class="btn btn-outline-secondary btn-sm"
            :disabled="item.quantity >= item.spaces"
          >
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>

      <!-- Price and Remove -->
      <div class="text-end">
        <div class="fw-bold mb-2">£{{ item.price * (item.quantity || 1) }}</div>
        <button @click="$emit('remove', item)" class="btn btn-outline-danger btn-sm">
          <i class="bi bi-trash me-1"></i>
          Remove
        </button>
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
        return obj.quantity !== undefined;
      },
    },
  },
};
</script>

<style scoped>
.subject-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  border-radius: 12px;
}

.quantity-control {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 2px;
  background-color: #fff;
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
}

.quantity-control button:hover:not(:disabled) {
  background-color: #f8f9fa;
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
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: white;
}

@media (max-width: 768px) {
  .d-flex {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .quantity-wrapper {
    width: 100%;
    order: 2;
  }

  .text-end {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    order: 1;
  }

  .text-end .fw-bold {
    margin-bottom: 0;
  }
}
</style>
