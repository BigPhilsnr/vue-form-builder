<template>
  <div>
    <div>
      <b-table
        style="width: 100%"
        :empty-text="`Items will be show here`"
        :empty-filtered-text="`No items to show`"
        :show-empty="true"
        :items="items"
        striped
        outlined
        bordered
        head-row-variant="secondary"
        :sticky-header="'62vh'"
        responsive
        ref="selectableTable"
        selectable
        @row-selected="onRowSelected"
        select-mode="single"
        hover
      />
    </div>
    {{loaded}}

    <b-modal :id="section.referenceTable" hide-footer size="xl">
      <FormRenderer :form-configuration="formData" v-model="formInputData" />
      <b-button variant="primary" class="mt-3" block @click="save()">
        Save
      </b-button>
    </b-modal>
    <div style="width:100%">
      <b-button
        variant="primary"
        id="show-btn"
        @click="$bvModal.show(section.referenceTable)"
        v-if="!readOnly"
        >Add Row</b-button
      >
    </div>
  </div>
</template>

<script>
import { TABLE_VIEW_MIXIN } from "@/mixins/table-view-mixin";
import {
  getFormConfiguration,
  saveFormData,
  notify,
} from "@/services/frappe";
import AddControlControl from "@/views/builder/add-controls/AddControlControl";

export default {
  name: "FullTableRowRenderView",
  components: { AddControlControl },
  mixins: [TABLE_VIEW_MIXIN],
  created() {
    if (this.section.referenceTable.length) {
      this.getForm(this.section.referenceTable);
    }
  },
  props: {
    parent: String,
    loaded:{type:Array, default:[]}
  },
  watch: {
    loaded(val){
      alert(JSON.stringify(val))
      if(val.length){
        this.items = val;
      }

    }
  },
  methods: {
    getSave() {
      const data = this.formInputData;
      const returnedTarget = Object.assign({}, data);
      this.items.unshift(returnedTarget);
      this.clearData();
    },

    setValues(val) {
      this.$set(this, "formInputData", val);
    },
    clearData() {
      const val = {};
      const keys = Object.keys(this.formInputData);
      keys.forEach((key) => {
        val[key] = "";
      });

      this.setValues(val);
    },
    onRowSelected(val) {},
    getForm(name) {
      getFormConfiguration({ name }).then((config) => {
        const formStringConfig = config.formdata;
        const configObject = JSON.parse(formStringConfig);
        this.configuration = formStringConfig;
        this.formName = config.name;
        this.formData = configObject;
        this.originalConfig = configObject;
      });
    },
    saveForm(formData) {
      saveFormData(formData).then((saved) => {
        this.getSave();
        notify("Item saved " + saved.name);
      });
    },

    save() {
      let form_content = this.formInputData;
      form_content = JSON.stringify(form_content);
      const form_name = this.formName;
      let doctype = "Mtrh Forms Repository";
      const parent_repo = this.parent;
      let formData = {
        doctype,
        form_content,
        parent_repo,
        form_name,
      };
      this.saveForm({ formData });
    },
  },
  data() {
    return {
      items: [],
      formData: {},
      formInputData: {},
    };
  },
};
</script>

<style scoped></style>
