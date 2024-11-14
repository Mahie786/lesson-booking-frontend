<template>
  <div class="container py-4">
    <!-- Title Section -->
    <h2 class="mb-4">Available Lessons</h2>

    <!-- Cards Row -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="lesson in lessons" :key="lesson.id">
        <LessonCard :lesson="lesson" @add-to-cart="handleAddToCart" />
      </div>
    </div>
  </div>
</template>

<script>
import LessonCard from "./LessonCard.vue";

export default {
  name: "LessonsPage",
  components: {
    LessonCard,
  },
  props: {
    lessons: Array,
  },
  methods: {
    handleAddToCart(lesson) {
      // Handle adding to cart
      console.log("Adding to cart:", lesson);
    },
  },
};
</script>
