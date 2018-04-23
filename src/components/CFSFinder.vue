<template>
  <div>
    <div class="btn-container">
      <h1 class="text-center">{{ msg }}</h1>
      <input type="button" v-if="showCFSBtn" class="cfs-btn" v-on:click="getCFS" value="FIND ME CFS!"/>
    </div>
    <div v-if="showList" class="list-container">
      <div v-for="(r, index) in showResults" :key="r.id">
        <ul class="cfs-list">
          <li>{{++index}}. {{r.restaurant.name}} - <a target="_blank" :href="getDirections(r)">Directions</a></li>
          <li class="cfs-list-item">Average Rating - {{r.restaurant.user_rating.aggregate_rating}} / 5</li>
          <li><a target="_blank" :href="r.restaurant.menu_url">Menu</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CFSFinder',
  props: {
    msg: String
  },
  mounted: function() {
      this.$store.dispatch('getCFSData');
  },
  methods: {
    getCFS: function() {
      this.$store.dispatch('getCFSSearchResults');
    },
    getDirections: function(r) {
        return 'https://www.google.com/maps/dir//' + r.restaurant.location.address + '/@' + this.$store.state.location.lat + ',' + this.$store.state.location.lng;
    }
  },
  computed: {
      showResults() {
          return this.$store.state.results;
      },
      showCFSBtn() {
          return this.$store.state.cuisineId !== '';
      },
      showList() {
          return this.$store.state.results.length > 0;
      }
  }
}
</script>

<style scoped>
  .cfs-btn {
    width: 100%;
    height: 4rem;
    border-radius: .5rem;
    background-color: #F4D06F;
    color: #000;
    font-weight: 600;
  }
  .list-container {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #F3C969;
    border-radius: 0.4rem;
  }
  .cfs-list {
    list-style: none;
    border: 1px solid #000;
    background-color: #ffedbc;
    border-radius: 0.4rem;
    padding: 15px 0 15px 10px;
  }

  .cfs-list-item {
    margin: 0 0 20px 0;
  }

  .btn-container {
    padding: 50px;
  }

  .text-center {
    text-align: center;
  }
</style>
