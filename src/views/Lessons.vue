<template>
  <div class="lessons-container">
    <!-- Search and sort component -->
    <search-sort-bar @search="handleSearch" @update-sort="handleSort" />
    <!-- List of lessons component -->
    <lesson-list
      :lessons="filteredLessons"
      :loading="loading"
      :error="error"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script>
// Import Vuex helpers and child components
import { mapState, mapGetters, mapActions } from "vuex";
import SearchSortBar from "@/components/lessons/SearchSort.vue";
import LessonList from "@/components/lessons/LessonList.vue";

export default {
  name: "LessonsView",

  components: {
    SearchSortBar,
    LessonList,
  },

  computed: {
    // Map Vuex state and getters to component properties
    ...mapState("lessons", ["loading", "error"]),
    ...mapGetters("lessons", ["filteredLessons"]),
  },

  methods: {
    // Map Vuex actions to component methods
    ...mapActions("lessons", [
      "updateSearch",
      "updateSort",
      "decrementSpaces",
      "fetchLessons",
    ]),
    ...mapActions("cart", ["addToCart"]),

    // Handle search term update
    handleSearch(term) {
      this.updateSearch(term);
    },

    // Handle sort criteria update
    handleSort(sortData) {
      this.updateSort(sortData);
    },

    // Handle adding a lesson to the cart
    handleAddToCart(lesson) {
      if (lesson.spaces > 0) {
        this.addToCart(lesson);
        this.decrementSpaces(lesson._id);
        this.fetchLessons();
      }
    },
  },

  // Fetch lessons when component is created
  created() {
    this.fetchLessons();
  },
};
</script>

<style scoped>
/* Styles for the lessons container */
.lessons-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Responsive styles for smaller screens */
@media (max-width: 1200px) {
  .lessons-container {
    padding: 15px;
  }
}
</style>
