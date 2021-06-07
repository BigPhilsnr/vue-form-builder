<template>
    <div class="section-container">
      

        <component :is="sectionViewComponent"
                   :section="section"
                   :rows="rows"
                   :controls="controls"
                   :parent ="parent"
                   :key="section.uniqueId"
                   :value-container="valueContainer"
                   :validation-errors="validationErrors"
        />

    </div>
</template>

<script>
    import {SECTION_TYPES} from "@/configs/section";

    export default {
        
        name: "SectionContainer",

        props: {
            section: Object,
            rows: Object,
            controls: Object,
            valueContainer: Object,
            validationErrors: Object,
            parent:{type:String, default:"no parent"},
        },

        computed: {
            sectionViewComponent() {
                this.section.parent = this.parent;
                return SECTION_TYPES[this.section.type].rendererView
            }
        },
    }
</script>

<style scoped>
</style>