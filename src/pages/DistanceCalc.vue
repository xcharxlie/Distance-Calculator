<template>
<main>
    <OriginDestForm/>
    <RouteList/>
    <DirectionsMapView/>

</main>
</template>

<script>
import Vue from 'vue'
import OriginDestForm from "@/components/OriginDestForm";
import RouteList from "@/components/RouteList";
import DirectionsMapView from "@/components/DirectionsMapView";

export default{
    components: {OriginDestForm,RouteList,DirectionsMapView}
}

</script>