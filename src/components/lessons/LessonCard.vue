<template>
  <div
    class="lesson-card card h-100 border-0 shadow-sm hover-effect rounded-4 overflow-hidden"
  >
    <!-- Card Header -->
    <div
      class="card-header bg-gradient d-flex justify-content-between align-items-center py-3"
    >
      <h5 class="card-title text-white mb-0">{{ lesson.subject }}</h5>
      <div class="subject-icon me-3">
        <i :class="lesson.icon" class="fs-3 text-white"></i>
      </div>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <div class="info-list">
        <!-- Location Info -->
        <div class="info-item d-flex align-items-center mb-3">
          <div class="info-icon me-3">
            <i class="bi bi-geo-alt-fill text-primary"></i>
          </div>
          <div>
            <small class="text-muted d-block">Location</small>
            <span class="fw-medium">{{ lesson.location }}</span>
          </div>
        </div>

        <!-- Price Info -->
        <div class="info-item d-flex align-items-center mb-3">
          <div class="info-icon me-3">
            <i class="bi bi-tag-fill text-primary"></i>
          </div>
          <div>
            <small class="text-muted d-block">Price</small>
            <span class="fw-medium">£{{ formatPrice(lesson.price) }}</span>
          </div>
        </div>

        <!-- Spaces Info -->
        <div class="info-item d-flex align-items-center">
          <div class="info-icon me-3">
            <i class="bi bi-people-fill" :class="spacesColorClass"></i>
          </div>
          <div>
            <small class="text-muted d-block">Available Spaces</small>
            <span class="fw-medium" :class="spacesColorClass">
              {{ lesson.spaces }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="card-footer border-0 bg-transparent p-4">
      <button
        @click="handleAddToCart"
        :disabled="!hasAvailableSpaces || isInCart"
        class="btn w-100 position-relative overflow-hidden"
        :class="buttonClasses"
      >
        <span class="btn-text">{{ buttonText }}</span>
        <i class="bi position-absolute end-0 me-3" :class="cartIconClass"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LessonCard",

  props: {
    lesson: {
      type: Object,
      required: true,
      validator(obj) {
        return ["id", "subject", "location", "price", "spaces", "icon"].every(
          (prop) => prop in obj
        );
      },
    },
  },

  computed: {
    ...mapGetters("cart", ["isLessonInCart"]),

    hasAvailableSpaces() {
      return this.lesson.spaces > 0;
    },

    isInCart() {
      return this.isLessonInCart(this.lesson.id);
    },

    buttonText() {
      if (this.isInCart) return "In Cart";
      if (!this.hasAvailableSpaces) return "No Spaces Left";
      return "Add to Cart";
    },

    buttonClasses() {
      if (this.isInCart) return "btn-success";
      if (!this.hasAvailableSpaces) return "btn-secondary opacity-50";
      return "btn-primary";
    },

    cartIconClass() {
      if (this.isInCart) return "bi-check-circle";
      return "bi-cart-plus";
    },

    spacesColorClass() {
      if (this.lesson.spaces === 0) return "text-danger";
      if (this.lesson.spaces <= 2) return "text-warning";
      return "text-primary";
    },
  },

  methods: {
    formatPrice(price) {
      return price.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },

    handleAddToCart() {
      if (this.hasAvailableSpaces && !this.isInCart) {
        this.$emit("add-to-cart", this.lesson);
      }
    },
  },
};
</script>

<style scoped>
.lesson-card {
  transition: all 0.3s ease;
  position: relative;
}

.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.card-header {
  background: linear-gradient(45deg, #007bff, #0056b3);
  border-bottom: none;
  position: relative;
  z-index: 1;
}

.info-icon {
  width: 35px;
  height: 35px;
  background: rgba(0, 123, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  padding: 0.8rem 1.5rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(45deg, #007bff, #0056b3);
  border: none;
}

.btn-success {
  background: linear-gradient(45deg, #28a745, #1e7e34);
  border: none;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(45deg, #0056b3, #004085);
}

.btn-success:hover:not(:disabled) {
  background: linear-gradient(45deg, #1e7e34, #145523);
}

.btn i {
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}

.btn:hover:not(:disabled) i {
  animation: slideIn 0.3s forwards;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    right: -20px;
  }
  100% {
    opacity: 1;
    right: 15px;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .card-body {
    padding: 1rem;
  }

  .info-icon {
    width: 30px;
    height: 30px;
  }

  .btn {
    padding: 0.6rem 1.2rem;
  }
}
</style>
