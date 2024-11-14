<template>
  <div class="sort-controls bg-white rounded shadow p-4 mb-4">
    <div class="flex flex-wrap gap-4">
      <div class="sort-by">
        <label class="block text-sm mb-1">Sort By:</label>
        <select
          :value="sortBy"
          @change="updateSort($event, 'sortBy')"
          class="p-2 border rounded"
        >
          <option value="subject">Subject</option>
          <option value="location">Location</option>
          <option value="price">Price</option>
          <option value="spaces">Availability</option>
        </select>
      </div>

      <div class="sort-direction">
        <label class="block text-sm mb-1">Order:</label>
        <select
          :value="sortOrder"
          @change="updateSort($event, 'sortOrder')"
          class="p-2 border rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LessonSort",

  props: {
    sortBy: {
      type: String,
      required: true,
    },
    sortOrder: {
      type: String,
      required: true,
    },
  },

  emits: ["update-sort"],

  methods: {
    updateSort(event, type) {
      this.$emit("update-sort", {
        sortBy: type === "sortBy" ? event.target.value : this.sortBy,
        sortOrder: type === "sortOrder" ? event.target.value : this.sortOrder,
      });
    },
  },
};
</script>
