<template>
  <div
    class="lesson-card card h-100 border-0 shadow-sm hover-effect rounded-4 overflow-hidden"
  >
    <div
      class="card-header bg-gradient d-flex justify-content-between align-items-center py-3"
    >
      <h5 class="card-title text-black mb-0">{{ lesson.subject }}</h5>
      <div class="subject-icon me-3">
        <i :class="lesson?.icon" class="fs-3"></i>
      </div>
      <!-- <div class="icon-wrapper rounded-circle">
        <i :class="lesson.icon" class="fs-4 text-black text-primary"></i>
      </div> -->
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <div class="info-list">
        <!-- Location Info -->
        <div class="info-item d-flex align-items-center mb-3">
          <div class="me-3">
            <i class="bi bi-geo-alt-fill text-primary"></i>
          </div>
          <div>
            <small class="text-muted d-block">Location</small>
            <span class="fw-medium">{{ lesson.location }}</span>
          </div>
        </div>

        <!-- Price Info -->
        <div class="info-item d-flex align-items-center mb-3">
          <div class="me-3">
            <i class="bi bi-tag-fill text-primary"></i>
          </div>
          <div>
            <small class="text-muted d-block">Price</small>
            <span class="fw-medium">£{{ lesson.price }}</span>
          </div>
        </div>

        <!-- Spaces Info -->
        <div class="info-item d-flex align-items-center">
          <div class="me-3">
            <i class="bi bi-people-fill text-primary"></i>
          </div>
          <div>
            <small class="text-muted d-block">Available Spaces</small>
            <span class="fw-medium">{{ lesson.spaces }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Card Footer -->
    <div class="card-footer border-0 bg-transparent p-4">
      <button
        @click="$emit('add-to-cart', lesson)"
        :disabled="!hasAvailableSpaces"
        class="btn w-100 position-relative overflow-hidden"
        :class="buttonClasses"
      >
        <span class="btn-text">{{ buttonText }}</span>
        <i class="bi bi-cart-plus position-absolute end-0 me-3"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LessonCard",
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  },
  emits: ["add-to-cart"],
  computed: {
    hasAvailableSpaces() {
      return this.lesson.spaces > 0;
    },
    buttonText() {
      return this.hasAvailableSpaces ? "Add to Cart" : "No Spaces Left";
    },
    buttonClasses() {
      return this.hasAvailableSpaces ? "btn-primary" : "btn-secondary opacity-50";
    },
  },
};
</script>

<style scoped>
.lesson-card {
  transition: all 0.3s ease;
  position: relative; /* Add this */
}

.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.card-header {
  background: linear-gradient(45deg, #007bff, #0056b3);
  border-bottom: none;
  position: relative; /* Add this */
  z-index: 1; /* Add this */
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

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(45deg, #0056b3, #004085);
  transform: translateY(-2px);
}

.btn i {
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}

.btn:hover i {
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

.card-header {
  background: linear-gradient(45deg, #007bff, #0056b3);
  border-bottom: none;
  position: relative;
  z-index: 1;
  color: white; /* Add this to ensure all text in header is white */
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white !important; /* Added !important to ensure icon color */
}

.icon-wrapper:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(12deg);
}
</style>
