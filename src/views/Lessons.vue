<template>
  <div class="lessons-container">
    <search-sort-bar
      :sort-by="sortBy"
      :sort-order="sortOrder"
      @search="handleSearch"
      @update-sort="updateSort"
    />
    <lesson-list
      :lessons="lessons"
      :loading="loading"
      :error="error"
      @add-to-cart="addToCart"
    />
    <!-- Cart Preview -->
    <div v-if="cart.length > 0" class="cart-preview">
      <h3>Cart ({{ cart.length }} items)</h3>
      <button @click="$router.push('/cart')">View Cart</button>
    </div>
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
      sortBy: "subject",
      sortOrder: "asc",
      searchQuery: "",
      searchFilters: {
        subject: true,
        location: true,
      },
    };
  },

  computed: {
    sortedAndFilteredLessons() {
      return this.lessons;
      let filteredLessons = this.filterLessons(this.lessons);
      return this.sortLessons(filteredLessons);
    },
  },

  methods: {
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

    handleSearch({ query, filters }) {
      this.searchQuery = query;
      this.searchFilters = filters;
    },

    updateSort({ sortBy, sortOrder }) {
      this.sortBy = sortBy;
      this.sortOrder = sortOrder;
    },

    filterLessons(lessons) {
      if (!this.searchQuery) return lessons;

      const query = this.searchQuery.toLowerCase();
      return lessons.filter((lesson) => {
        if (this.searchFilters.subject && lesson.subject.toLowerCase().includes(query)) {
          return true;
        }
        if (
          this.searchFilters.location &&
          lesson.location.toLowerCase().includes(query)
        ) {
          return true;
        }
        return false;
      });
    },

    sortLessons(lessons) {
      return [...lessons].sort((a, b) => {
        let comparison = 0;
        if (this.sortBy === "price" || this.sortBy === "spaces") {
          comparison = a[this.sortBy] - b[this.sortBy];
        } else {
          comparison = a[this.sortBy].localeCompare(b[this.sortBy]);
        }
        return this.sortOrder === "asc" ? comparison : -comparison;
      });
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

  created() {
    // this.fetchLessons();
  },
};
</script>
