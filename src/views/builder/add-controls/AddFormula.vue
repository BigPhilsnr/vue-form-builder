<template>
  <div class="add-control-outer" :class="styles.COLUMNS.COL12">
    <div class="add-control-container" @click="openAddControl">
      <span v-html="$form.getIcon('addOutline', '32px', '32px', '#000')"></span>
      <span>Add Formula</span>
    </div>
  </div>
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { EVENT_CONSTANTS } from "@/configs/events";
import SidebarRenderer from "@/libraries/sidebar-renderer.class";
import SidebarControlSelectList from "@/views/builder/sidebar-config-views/SidebarFormulaSelectList";

export default {
  name: "AddFormula",
  mixins: [STYLE_INJECTION_MIXIN],
  props: {
    section: {
      type: Object,
      required: false,
    },

    // TODO: Need to extend: Row too.
  },
  data: () => ({
    show: false,
  }),
  methods: {
    /**
     * Open the sidebar to add control yeah yeah
     */
    openAddControl() {
      this.$formEvent.$emit(
        EVENT_CONSTANTS.BUILDER.SIDEBAR.OPEN,
        this.runnerId
      );
    },

    /**
     * Render the sidebar if can be opened hehe
     */
    afterOpenedSidebar(runnerId) {
      if (runnerId !== this.runnerId) {
        return;
      }

      // render
      this.renderSidebar();
    },

    /**
     * Trigger this to render the GlobalSidebar for Select Controls
     */
    renderSidebar() {
      this.$formEvent.$emit(
        EVENT_CONSTANTS.BUILDER.SIDEBAR.INJECT,
        new SidebarRenderer(
          this.runnerId,
          SidebarControlSelectList,
          this.section
        )
      );
    },

    /**
     * After user chose a control. This will be invoked in order to create a new control
     */
    createNewFormFormula(runnerId, controlObj) {
      // runnerId to check the right identifier of the Invoker
      // uniqueId to check if we create new control or not
      if (this.runnerId !== runnerId) {
        return;
      }

  
    //   this.$formEvent.$emit(
    //     EVENT_CONSTANTS.BUILDER.FORMULA.ADD,
    //     this.section.uniqueId,
    //     controlObj
    //   );
    },
  },

  computed: {
    /**
     * Runner ID to detect the right
     * @returns {string}
     */
    runnerId() {
      return `add-control-FORMULAR}`;
    },
  },

  created() {
    // listen to Global Sidebar
    this.$formEvent.$on(
      EVENT_CONSTANTS.BUILDER.SIDEBAR.OPENED,
      this.afterOpenedSidebar
    );
   
     this.$formEvent.$on(
      EVENT_CONSTANTS.BUILDER.SIDEBAR.CLOSE,
      this.createNewFormFormula
    );
  },
};
</script>
