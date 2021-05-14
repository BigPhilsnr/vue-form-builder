<template>
  <div class="sidebar-form-configuration">
    <h5>Select Concept</h5>
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
        <p class="type-headline" v-text="control.name || control.type "></p>
        <p class="type-desc" v-text="control.description"></p>
      </a>
    </div>
  </div>
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { CONTROLS, STATIC_CONTROLS } from "@/configs/controls";
import { SIDEBAR_BODY_MIXIN } from "@/mixins/sidebar-body-mixin";
import { HELPER } from "@/libraries/helper";

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
      //   "Female",
      //   "Refers to female gender",
      //   '{"uniqueId":"control-a4d0e350-b1cf-42ed-bfc4-957655457b0b","type":"text","name":"Female","label":"Female","isShowLabel":true,"placeholderText":"","containerClass":"col-md-6 md-layout-item md-size-50","additionalContainerClass":"","additionalFieldClass":"","additionalLabelClass":"","defaultValue":"","validations":[],"rows":3}',
      // ],
      // [
      //   "Firstname",
      //   "The first name of a person",
      //   '{"uniqueId":"control-8e6f1378-109c-48e2-8344-267e3a8c91d5","type":"input","name":"Firstname","label":"First name","isShowLabel":true,"placeholderText":"","containerClass":"col-md-6 md-layout-item md-size-50","additionalContainerClass":"","additionalFieldClass":"","additionalLabelClass":"","defaultValue":"","validations":[]}',
      // ],
      // [
      //   "DC-Gender-00005",
      //   "The gender of a person normally referring to male or female",
      //   '{"uniqueId":"control-7a1c4094-c552-4811-a1ef-a68f7632d9e1","type":"radio","name":"DC-Gender-00005","label":"Gender","isShowLabel":true,"placeholderText":"","containerClass":"col-md-6 md-layout-item md-size-50","additionalContainerClass":"","additionalFieldClass":"","additionalLabelClass":"","defaultValue":"","validations":[],"displayMode":"line","position":"left","items":[{"text":"Male","value":"DC-Male-00003"},{"text":"Female","value":"Female"}]}',
      // ],
      // [
      //   "Lastname",
      //   "The lastname of a person as per identification documents",
      //   '{"uniqueId":"control-8e6f1378-109c-48e2-8344-267e3a8c91d5","type":"input","name":"Lastname","label":"Lastname","isShowLabel":true,"placeholderText":"","containerClass":"col-md-6 md-layout-item md-size-50","additionalContainerClass":"","additionalFieldClass":"","additionalLabelClass":"","defaultValue":"","validations":[]}',
      // ],
    ],
  }),
  computed: {
    controlList() {
      const list= this.apiList.map((item) => {
        return { name: item[0], description: item[1], config: item[2] };
      });
      return[...list, ...STATIC_CONTROLS]
    },
  },
  watch: {
    searchQuery: function(t) {
      this.fetchConcepts(t);
    },
  },
  methods: {
    selectedControl(controlKey) {
      // create
      //   this.newControlData = createControlData(controlKey);
      if(controlKey.config){
         const configuration = JSON.parse(controlKey.config);
      configuration.uniqueId = controlKey.name;
      
      this.newControlData = configuration;
      this.save(true);
      }else{
        controlKey.uniqueId = "control-" + HELPER.getUUIDv4();
      this.newControlData = controlKey;
      this.save(true);

      }
     
    },

    fetchConcepts: function(t) {
      var e = this;
      frappe.call({
        method: "clinical.api.forms.form_builder.concept_query",
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
