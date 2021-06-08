<template>
  <SidebarToggleableContainer headline="Basic Detail">
    <div :class="styles.FORM.FORM_GROUP">
      <label>Unique ID</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        :value="control.uniqueId"
        readonly
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Name (Must be unique)</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="control.name"
        readonly
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Label</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="control.label"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Sub-label</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="control.subLabel"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Mapped Field</label>
      <div>
      
        <select v-model="control.mappedField" :class="styles.FORM.FORM_CONTROL" >
          <option disabled value="">Please select field</option>
          <option
            v-for="field in doctypeFields"
            :key="field"
            >{{ field }}
          </option>
        </select>
      
      </div>
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>
        Show Label?
        <input type="checkbox" v-model="control.isShowLabel" />
      </label>
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>
        Evaluated Visibility
        <input type="checkbox" v-model="control.evaluatedVisibility" />
      </label>
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Hide condition</label>
      <textarea
        :class="styles.FORM.FORM_CONTROL"
        v-model="control.hideCondition"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Field Placeholder (Optional)</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="control.placeholderText"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Default Value (Optional)</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="control.defaultValue"
      />
    </div>
  </SidebarToggleableContainer>
</template>

<script>
import SidebarToggleableContainer from "@/views/container-views/SidebarToggleableContainer";
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { getDoctypeFields } from "@/services/frappe";

export default {
  name: "ControlBasicInformation",
  mixins: [STYLE_INJECTION_MIXIN],
  components: { SidebarToggleableContainer },
  data() {
    return {
      doctypeFields: [],
    };
  },
  props: {
    control: Object,
    formData: Object,
  },
  created() {
    this.control.depends = "";
  },
  watch:{
    formData(val){
      this.getFields();
    }
  },
  mounted() {
    this.getFields();
  },
  methods: {
    getFields() {
      if (
        this.formData &&
        this.formData.formConfig &&
        this.formData.formConfig.mappedDoctype.length
      ) {
        let data = { doctype: this.formData.formConfig.mappedDoctype};
    
        getDoctypeFields(data).then((result) => {
          this.doctypeFields = result.fields.map(item=> item.fieldname);
        });
      }
    },
    setField(field) {
      this.$set(this.control, "mappedField", field);
    },
  },
};
</script>

<style scoped></style>
