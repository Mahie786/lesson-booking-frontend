<template>
  <div class="search-container bg-white p-4 rounded shadow mb-4">
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search lessons..."
      class="w-full p-2 border rounded"
      @input="handleSearch"
    />
    <div class="mt-2 flex gap-4">
      <label class="flex items-center">
        <input type="checkbox" v-model="filters.subject" @change="handleSearch" />
        <span class="ml-2">Subject</span>
      </label>
      <label class="flex items-center">
        <input type="checkbox" v-model="filters.location" @change="handleSearch" />
        <span class="ml-2">Location</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "LessonSearch",
  data() {
    return {
      searchTerm: "",
      filters: {
        subject: true,
        location: true,
      },
    };
  },
  methods: {
    handleSearch() {
      this.$emit("search", {
        term: this.searchTerm,
        filters: this.filters,
      });
    },
  },
};
</script>
