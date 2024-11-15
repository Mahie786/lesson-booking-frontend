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
      "initializeLessons",
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
        this.decrementSpaces(lesson.id);
      }
    },
  },

  created() {
    const initialLessons = [
      {
        id: 1,
        subject: "Mathematics",
        location: "London",
        price: 100,
        spaces: 0,
        icon: "bi bi-calculator",
      },
      {
        id: 2,
        subject: "English",
        location: "Manchester",
        price: 90,
        spaces: 3,
        icon: "bi bi-book",
      },
      {
        id: 3,
        subject: "Biology",
        location: "Birmingham",
        price: 110,
        spaces: 4,
        icon: "bi bi-virus",
      },
      {
        id: 4,
        subject: "Music",
        location: "London",
        price: 100,
        spaces: 5,
        icon: "bi bi-music-note-beamed",
      },
      {
        id: 5,
        subject: "Geography",
        location: "Manchester",
        price: 90,
        spaces: 3,
        icon: "bi bi-globe",
      },
      {
        id: 6,
        subject: "Computer",
        location: "Birmingham",
        price: 110,
        spaces: 4,
        icon: "bi bi-laptop",
      },
      {
        id: 7,
        subject: "History",
        location: "London",
        price: 100,
        spaces: 5,
        icon: "bi bi-hourglass-split",
      },
      {
        id: 8,
        subject: "Art",
        location: "Manchester",
        price: 90,
        spaces: 3,
        icon: "bi bi-palette",
      },
      {
        id: 9,
        subject: "Physical Education",
        location: "Birmingham",
        price: 110,
        spaces: 4,
        icon: "bi bi-bicycle",
      },
      {
        id: 10,
        subject: "Languages",
        location: "Birmingham",
        price: 110,
        spaces: 4,
        icon: "bi bi-translate",
      },
    ];

    this.initializeLessons(initialLessons);
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
