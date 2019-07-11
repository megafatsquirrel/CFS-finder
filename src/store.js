import Vue from "vue";
import Vuex from 'vuex';

export function createStore() {
    return new Vuex.Store({
        state: {
            results: [],
            location: {},
            cityId: '',
            cuisineId: '',
            baseURL: 'https://developers.zomato.com/api/v2.1/',
            config: {headers: {'user-key': process.env.VUE_APP_API_KEY}}
        },
        mutations: {
            setLocation (state, data) {
                state.location = data;
            },
            setCity (state, data) {
                state.cityId = data;
            },
            setCuisine (state, data) {
                state.cuisineId = data;
            },
            setResults (state, data) {
                state.results = data;
            }
        },
        actions: {
            getCFSData(context) {
                var self = this;
                return new Promise(resolve => {
                    navigator.geolocation.getCurrentPosition( position => {
                        context.commit('setLocation', {lat: position.coords.latitude, lng: position.coords.longitude});
                        getCity();
                    });

                    function getCity() {
                        let query = 'cities?lat='+ self.state.location.lat +'&lon='+ self.state.location.lng;
                        let url = self.state.baseURL + query;
                        Vue.http.get(url, self.state.config)
                            .then(response => {
                                context.commit('setCity', response.data.location_suggestions[0].id);
                                getCuisine();
                            });
                    }

                    function getCuisine() {
                        let query = 'cuisines?city_id=' + self.state.cityId + '&lat='+ self.state.location.lat +'&lon='+ self.state.location.lng;
                        let url = self.state.baseURL + query;
                        Vue.http.get(url, self.state.config)
                            .then(response => {
                                var temp = response.data.cuisines.filter(c => c.cuisine.cuisine_name === 'Diner');
                                context.commit('setCuisine', temp[0].cuisine.cuisine_id);
                            });
                    }
                    resolve();
                });
            },
            getCFSSearchResults(context) {
                let searchQuery = 'search?lat='+ this.state.location.lat +'&lon='+ this.state.location.lng +'&count=10&cuisines=' + this.state.cuisineId;
                let url = this.state.baseURL + searchQuery;
                Vue.http.get(url, this.state.config)
                    .then(response => {
                        context.commit('setResults', response.data.restaurants);
                    });
            }
        },
        getters: {
            returnResults: state => {
                return state.results;
            }
        }
    });
}