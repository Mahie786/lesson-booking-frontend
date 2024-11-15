<template>
  <div class="search-sort-container border-bottom">
    <div class="container py-4">
      <div class="row g-4 align-items-end justify-content-between">
        <!-- Search Input - Left side -->
        <div class="col-md-5">
          <div class="form-group">
            <label class="control-label">Search</label>
            <div class="search-input-wrapper">
              <div class="search-icon">
                <i class="bi bi-search"></i>
              </div>
              <input
                type="text"
                v-model="searchTerm"
                @input="handleSearch"
                placeholder="Search lessons..."
                class="search-input"
              />
              <button
                v-if="searchTerm"
                @click="clearSearch"
                class="clear-button"
                title="Clear search"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Sort Controls - Right side -->
        <div class="col-md-7">
          <div class="sort-controls">
            <div class="sort-group">
              <label class="control-label">Sort by</label>
              <select v-model="sortBy" @change="onChangeSort" class="sort-select">
                <option value="subject">Subject</option>
                <option value="location">Location</option>
                <option value="price">Price</option>
                <option value="spaces">Availability</option>
              </select>
            </div>

            <div class="sort-group">
              <label class="control-label">Order</label>
              <select v-model="sortOrder" @change="onChangeSort" class="sort-select">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Script remains the same
export default {
  name: "SearchSort",
  data() {
    return {
      sortBy: "subject",
      sortOrder: "asc",
      searchTerm: "",
    };
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.searchTerm);
    },
    clearSearch() {
      this.searchTerm = "";
      this.handleSearch();
    },
    onChangeSort() {
      this.$emit("update-sort", {
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      });
    },
  },
};
</script>
