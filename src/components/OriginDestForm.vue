<template>
    <section class="origin-destination-form">
        <div class="ui form">
            <div class = "ui message red small" v-show="error">{{error}}</div>
            <div class="two fields">
                <div class="field">
                    <div class="ui left icon input">
                        <i class="marker alternate icon"></i>
                        <input type="text" placeholder="Origin" ref = "origin"/>
                    </div>
                </div>
                <div class="field">
                    <div class="ui left icon input">
                        <i class="flag checkered icon"></i>
                        <input type="text" placeholder="Destination" ref="dest"/>
                    </div>
                </div>
                <button class = "ui small green button" :class="{loading:spinner}" @click = "calculateButtonPressed">Calculate</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.origin-destination-form{
    position: relative;
    z-index: 1;
    max-width: 610px;
    margin: 10px;
    background-color:white;
}
</style>

<script>
import axios from "axios";
import firebase from "firebase";
export default {
    data(){
        return {
            route:{
                origin:{
                    address:"",
                    lat:0,
                    lng:0
                },
                dest: {
                    address:"",
                    lat:0,
                    lng:0
                },
                distance:{},
                duration:{}
            },
            error:"",
            spinner: false
        };
    },

    mounted(){
        for(let ref in this.$refs){
            // console.log(this.$refs[ref]);
            const autocomplete = new window.google.maps.places.Autocomplete(
                this.$refs[ref],
                {
                    bounds: new window.google.maps.LatLngBounds(
                        new window.google.maps.LatLng(45,-122)
                    )
                }
            );

            autocomplete.addListener("place_changed",()=>{
                const place = autocomplete.getPlace();
                this.route[ref].address = `${place.name},${place.vicinity}`;
                this.route[ref].lat = place.geometry.location.lat();
                this.route[ref].lng = place.geometry.location.lng();

            });
        }
        // const originAutocomplete = new window.google.maps.places.Autocomplete(
        //     this.$refs["origin"],
        //     {
        //         bounds: new window.google.maps.LatLngBounds(
        //             new window.google.maps.LatLng(45,-122)
        //         )
        //     }
        // );
        // originAutocomplete.addListener("place_changed",()=>{
        //     consle.log(originAutocomplete.getPlace());
        // });

        // const destcomplete = new window.google.maps.places.Autocomplete(
        //     this.$refs["dest"],
        //     {
        //         bounds: new window.google.maps.LatLngBounds(
        //             new window.google.maps.LatLng(45,-122)
        //         )
        //     }
        // );
        // destcomplete.addlistener("place_changed", ()=> {
        //     console.log(destcomplete.getPlace());
        // })
    },

    methods:{

        calculateButtonPressed(){
            this.spinner = true;
            const URL  = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?origins=${this.route.origin.lat},${this.route.origin.lng}&destinations=${this.route.dest.lat},${this.route.dest.lng}&key=AIzaSyBLv10Y3bpIJKxZHykJLeK9Gpn5VRxYO7g`;
            axios.get(URL).then(response=>{
                if(response.data.error_message){
                    this.error = response.data.error_message;
                }else{
                    const elements = response.data.rows[0].elements;
                    if(elements[0].status === "ZERO_RESULTS"){
                        this.error = "No Results Found.";
                    }else{
                        console.log(elements[0].distance);
                        console.log(elements[0].duration);


                        this.route.distance = elements[0].distance;
                        this.route.duration = elements[0].duration;
                        this.saveRoute();
                    }
                    this.spinner = false;
                }
            })
            .catch(error=>{
                console.log(error.message);
                this.error = error.message;
                this.spinner = false;
            });
        },
        saveRoute(){
            const db = firebase.firestore();
            db.collection("routes").doc().set(this.route);
        }
    }
};
</script>