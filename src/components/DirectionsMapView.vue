<template>
   <section class="map" ref = "map"></section>
</template>

<script>
import { EventBus } from "@/EventBus";
export default {
    data(){
        return{
            map:null
        };
    },

    mounted(){
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        const map = new window.google.maps.Map(this.$refs["map"], {
            center: new window.google.maps.LatLng(45,-122),
            zoom:15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            
        });
        
        EventBus.$on("route-data", ({origin, dest})=>{
            directionsService.route({
                origin: origin.address,
                destination: dest.address,
                travelMode:"DRIVING"   
            },
            (response,status)=>{
                if(status==="OK") {
                    directionsRenderer.setDirections(response);
                    directionsRenderer.setMap(map);
                }
                console.log(response);
                console.log(status);
            });
        });
        //console.log("mapsL");
    }
};
</script>
<style scoped>
.map{
    position:absolute;
    right:0;
    top:0;
    left:0;
    background-color:red;
}
</style>