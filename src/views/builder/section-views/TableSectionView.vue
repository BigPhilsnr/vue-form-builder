<template>
    <div class="table-section">
        <div class="headline-block p5" v-show="section.isShowHeadline">
            <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
            <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
        </div>
 
        <div class="table-wrapper">
             <FullTableRowView :class="styles.TABLE.TABLE_CLASS"
                              :section="section"
                              :readOnly="true"
                              />
          
        </div>
    </div>
</template>

<script>
    import {SECTION_VIEW_MIXINS} from "@/mixins/section-view-mixins";
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import AddRowControl from "@/views/builder/add-controls/AddRowControl";
    import FullTableRowView from "@/views/builder/row-views/FullTableRowView";

    export default {
        name: "TableSectionView",
        components: {FullTableRowView, AddRowControl},
        mixins: [SECTION_VIEW_MIXINS, STYLE_INJECTION_MIXIN],
        methods: {
        }
    }
</script>

<style scoped>

</style>