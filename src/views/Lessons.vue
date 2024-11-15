<template>
  <div class="lessons-container">
    <search-sort-bar @search="handleSearch" @update-sort="updateSort" />
    <lesson-list
      :lessons="lessons"
      :loading="loading"
      :error="error"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script>
import SearchSortBar from "@/components/lessons/SearchSort.vue";
import LessonList from "@/components/lessons/LessonList.vue";

export default {
  name: "Lessons",

  components: {
    SearchSortBar,
    LessonList,
  },

  data() {
    return {
      lessons: [
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
        // Add more lessons as needed
      ],
      cart: [],
      loading: false,
      error: null,
    };
  },

  computed: {},

  methods: {
    sortLessons(sortKey, sortOrder = "asc") {
      this.lessons = this.lessons.sort((a, b) => {
        if (typeof a[sortKey] === "string") {
          // Case-insensitive string comparison
          const result = a[sortKey].localeCompare(b[sortKey]);
          return sortOrder === "asc" ? result : -result;
        } else {
          // Numeric or other type comparison
          const result = a[sortKey] - b[sortKey];
          return sortOrder === "asc" ? result : -result;
        }
      });
    },
    async fetchLessons() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch("/api/lessons");
        const data = await response.json();
        this.lessons = data;
      } catch (err) {
        this.error = "Failed to load lessons";
      } finally {
        this.loading = false;
      }
    },

    handleSearch(term) {
      console.log("Search term:", term);
    },

    updateSort({ sortBy, sortOrder }) {
      this.sortLessons(sortBy, sortOrder);
    },

    addToCart(lesson) {
      const lessonToAdd = { ...lesson };
      this.cart.push(lessonToAdd);

      // Update spaces
      const lessonIndex = this.lessons.findIndex((l) => l.id === lesson.id);
      if (lessonIndex !== -1) {
        this.lessons[lessonIndex].spaces--;
      }
    },
  },

  mounted() {
    // this.fetchLessons();
  },
};
</script>
