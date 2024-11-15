<template>
  <div class="container py-4">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-4">
      <div class="alert alert-danger" role="alert">
        {{ error }}
      </div>
    </div>

    <!-- Lessons List -->
    <div v-else>
      <!-- Title Section -->
      <h2 class="mb-4">Available Lessons</h2>

      <!-- No Results -->
      <div v-if="lessons.length === 0" class="text-center py-4">
        <p class="text-muted">No lessons found.</p>
      </div>

      <!-- Cards Row -->
      <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="lesson in lessons" :key="lesson.id">
          <LessonCard :lesson="lesson" @add-to-cart="handleAddToCart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LessonCard from "./LessonCard.vue";

export default {
  name: "LessonList",

  components: {
    LessonCard,
  },

  props: {
    lessons: {
      type: Array,
      required: true,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleAddToCart(lesson) {
      this.$emit("add-to-cart", lesson);
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 200px; /* Minimum height to prevent layout shifts */
}

/* Fade animation for loading state */
.spinner-border {
  opacity: 0.8;
}

/* Card hover effect */
.col:hover {
  transform: translateY(-2px);
  transition: transform 0.2s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 10px;
    padding-right: 10px;
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
