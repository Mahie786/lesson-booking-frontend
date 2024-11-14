<template>
  <div class="bg-white border-bottom">
    <div class="container">
      <div class="row py-3 align-items-end justify-content-between">
        <!-- Search Input - Left side -->
        <div class="col-md-4">
          <div class="search-input">
            <i class="bi bi-search text-muted position-absolute ps-3 pt-2"></i>
            <input
              type="text"
              v-model="searchTerm"
              @input="handleSearch"
              placeholder="Search lessons..."
              class="form-control ps-5"
            />
          </div>
        </div>

        <!-- Sort Controls - Right side -->
        <div class="col-md-7">
          <div class="d-flex gap-4 justify-content-end">
            <div>
              <label class="form-label text-muted small mb-2">Sort by:</label>
              <select
                :value="sortBy"
                @change="$emit('update-sort', $event, 'sortBy')"
                class="form-select form-select-sm"
              >
                <option value="subject">Subject</option>
                <option value="location">Location</option>
                <option value="price">Price</option>
                <option value="spaces">Availability</option>
              </select>
            </div>

            <div>
              <label class="form-label text-muted small mb-2">Order:</label>
              <select
                :value="sortOrder"
                @change="$emit('update-sort', $event, 'sortOrder')"
                class="form-select form-select-sm"
              >
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
export default {
  props: {
    sortBy: String,
    sortOrder: String,
  },
  data() {
    return {
      searchTerm: "",
      filters: {
        subject: false,
        location: false,
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

<style scoped>
.search-input {
  position: relative;
}

.form-control {
  border-radius: 20px;
  border: 1px solid #dee2e6;
  padding: 0.5rem 1rem;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}

.form-select {
  border: 1px solid #dee2e6;
  min-width: 130px;
  transition: all 0.2s ease;
}

.form-select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
}

/* Subtle shadow at the bottom */
.bg-white {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

/* Making the component more compact on mobile */
@media (max-width: 768px) {
  .row {
    gap: 1rem;
  }

  .col-md-7 .d-flex {
    flex-wrap: wrap;
    gap: 1rem !important;
  }

  .form-select {
    min-width: 100px;
  }
}
</style>
