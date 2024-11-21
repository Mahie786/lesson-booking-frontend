<template>
  <div class="lessons-container">
    <search-sort-bar @search="handleSearch" @update-sort="handleSort" />
    <lesson-list
      :lessons="filteredLessons"
      :loading="loading"
      :error="error"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script>
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
    ...mapState("lessons", ["loading", "error"]),
    ...mapGetters("lessons", ["filteredLessons"]),
  },

  methods: {
    ...mapActions("lessons", [
      "updateSearch",
      "updateSort",
      "decrementSpaces",
      "fetchLessons",
    ]),
    ...mapActions("cart", ["addToCart"]),

    handleSearch(term) {
      this.updateSearch(term);
    },

    handleSort(sortData) {
      this.updateSort(sortData);
    },

    handleAddToCart(lesson) {
      if (lesson.spaces > 0) {
        this.addToCart(lesson);
        this.decrementSpaces(lesson._id);
        this.fetchLessons();
      }
    },
  },

  created() {
    this.fetchLessons();
  },
};
</script>

<style scoped>
.lessons-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .lessons-container {
    padding: 15px;
  }
}
</style>
