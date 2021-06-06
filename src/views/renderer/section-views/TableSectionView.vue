<template>
    <div class="table-section">
        <div class="headline-block p5" v-show="section.isShowHeadline">
            <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
            <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
        </div>

        <div class="table-wrapper">

             <FullTableRowRenderView 
                              :key="'123'"
                              :section="section"
                              :parent ="parent"
                              :readOnly="false"
                              />
        </div>
    </div>
</template>

<script>
    import {SECTION_VIEW_MIXINS} from "@/mixins/section-view-mixins";
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import AddRowControl from "@/views/builder/add-controls/AddRowControl";
    import FullTableRowRenderView from "@/views/builder/row-views/FullTableRowRenderView";

    export default {
        name: "TableSectionView",
        components: {FullTableRowRenderView, AddRowControl},
        mixins: [SECTION_VIEW_MIXINS, STYLE_INJECTION_MIXIN],
        methods: {
        },
        props:{
parent:String,
        }
    }
</script>

<style scoped>

</style>