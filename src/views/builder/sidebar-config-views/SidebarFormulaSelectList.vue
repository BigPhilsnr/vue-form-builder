<template>
  <div class="sidebar-form-configuration">
    <h5>Select Formula</h5>
    <div>
      <div class="" style="margin-bottom:8px">
        <div class="">
          <input
            type="text"
            placeholder="Search...."
            v-model="searchQuery"
            class="form-control md-field"
          />
        </div>
      </div>
    </div>

    <div :class="[styles.LIST_GROUP.CONTAINER]">
      <a
        href="javascript:void(0)"
        :class="styles.LIST_GROUP.SINGLE_ITEM"
        v-for="control in controlList"
        :key="control.name"
        @click="selectedControl(control)"
      >
        <p class="type-headline" v-text="control.name"></p>
        <p class="type-desc" v-text="control.description"></p>
      </a>
    </div>
  </div>
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { CONTROLS } from "@/configs/controls";
import { SIDEBAR_BODY_MIXIN } from "@/mixins/sidebar-body-mixin";
import { EVENT_CONSTANTS } from "@/configs/events";
export default {
  name: "SidebarControlSelectList",
  mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],
  computed: {
    controlTypes: () => CONTROLS,
  },

  data: () => ({
    dataKey: "newControlData",
    newControlData: null,
    searchQuery: null,
    apiList: [
      // [
      //   "BMI formula",
      //   "Calculate the BMI",
      //   "[Lastname] / ([Firstname]  *  [Firstname] )",
      //   "Female",
      // ],
    ],
  }),
  computed: {
    controlList() {
      return this.apiList.map((item) => {
        return {
          name: item[0],
          description: item[1],
          formula: item[2],
          output: item[3],
        };
      });
    },
  },
  watch: {
    searchQuery: function(t) {
      this.fetchConcepts(t);
    },
  },

  methods: {
    selectedControl(controlKey) {
      this.close();
      this.$formEvent.$emit(EVENT_CONSTANTS.BUILDER.FORMULA.ADD, controlKey);
    },
    fetchConcepts: function(t) {
      var e = this;
      frappe.call({
        method: "clinical.api.forms.form_builder.concept_formula_query",
        args: { txt: t },
        callback: function(t) {
          var n = t.message;
          e.apiList = n;
        },
      });
    },
  },
};
</script>

<style scoped></style>
