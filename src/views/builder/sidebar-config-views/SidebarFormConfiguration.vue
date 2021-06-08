<template>
  <div class="sidebar-form-configuration">
    <div :class="styles.FORM.FORM_GROUP">
      <label>
        Form Config
        <input type="checkbox" v-model="frmConfig" />
      </label>
    </div>
    <div v-show="frmConfig">
      <h5>Main Form Configuration</h5>

      <div :class="styles.FORM.FORM_GROUP">
        <label>Form Headline</label>
        <input
          type="text"
          :class="styles.FORM.FORM_CONTROL"
          v-model="formConfiguration.headline"
        />
      </div>

      <div :class="styles.FORM.FORM_GROUP">
        <label>Form Sub-Headline</label>
        <input
          type="text"
          :class="styles.FORM.FORM_CONTROL"
          v-model="formConfiguration.subHeadline"
        />
      </div>

       <div :class="styles.FORM.FORM_GROUP">
      <label> Mapped Doctype</label>
      <div ref="doctype" class="ref-field-input"></div>
    </div>


      <div :class="styles.FORM.FORM_GROUP">
        <label>
          Show Form Headline?
          <input type="checkbox" v-model="formConfiguration.isShowHeadline" />
        </label>
      </div>
    </div>

    <hr />
    <div :class="styles.FORM.FORM_GROUP">
      <label>
        Add Formula
        <input type="checkbox" v-model="frm" />
      </label>
    </div>

    <div v-show="frm">
      <div :class="styles.FORM.FORM_GROUP">
        <label>Name</label>
        <input
          type="text"
          :class="styles.FORM.FORM_CONTROL"
          v-model="tempFormula.name"
        />
      </div>

      <div :class="styles.FORM.FORM_GROUP">
        <label>Formula</label>
        <textarea
          rows="6"
          type="text"
          :class="styles.FORM.FORM_CONTROL"
          v-model="tempFormula.formula"
        />
      </div>

      <div :class="styles.FORM.FORM_GROUP">
        <label>Output Field</label>
        <input
          type="text"
          :class="styles.FORM.FORM_CONTROL"
          v-model="tempFormula.output"
        />
      </div>

      <div :class="styles.FORM.FORM_GROUP">
        <button :class="styles.FORM.FORM_CONTROL" @click="addFormula">
          Add Formula
        </button>
      </div>
    </div>

    <div
      :class="styles.FORM.FORM_GROUP"
      v-for="formula in formConfiguration.formula"
      :key="formula"
    >
      <label
        >{{ formula.name }}
        <span
          class="pointer"
          title="Click this to remove this rule"
          @click="removeFormula(formula)"
          v-html="$form.getIcon('close', '16px', '16px', 'red')"
        >
        </span
      ></label>
      <textarea
        type="text"
        rows="6"
        :class="styles.FORM.FORM_CONTROL"
        v-model="formula.formula"
        readonly
      />
    </div>
    <hr />
    <div :class="styles.FORM.FORM_GROUP">
      <label>
        Wrapper &#x3C;form&#x3E; outside of the Form?
        <input type="checkbox" v-model="formConfiguration.renderFormTag" />
      </label>
    </div>
    <div v-show="formConfiguration.renderFormTag">
      <div :class="styles.FORM.FORM_GROUP">
        <label>Form-TAG Action URL</label>
        <input
          type="text"
          :class="styles.FORM.FORM_CONTROL"
          v-model="formConfiguration.formActionURL"
        />
      </div>

      <div :class="styles.FORM.FORM_GROUP">
        <label>Form-TAG Method</label>
        <input
          type="text"
          :class="styles.FORM.FORM_CONTROL"
          v-model="formConfiguration.formMethod"
        />
      </div>
    </div>

    <div class="buttons">
      <button :class="styles.BUTTON.PRIMARY" @click="save(false)">
        Save
      </button>
      <button :class="styles.BUTTON.INFO" @click="save(true)">
        Save & Close
      </button>
    </div>
  </div>
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { SIDEBAR_BODY_MIXIN } from "@/mixins/sidebar-body-mixin";
import { FORM_DEFAULT_DATA } from "@/configs/form";

/**
 * @property {FORM_DEFAULT_DATA} formConfiguration
 */
export default {
  name: "SidebarFormConfiguration",
  mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],
  data: () => ({
    // OVERRIDE IT FROM `SIDEBAR_BODY_MIXIN`
    dataKey: "formConfiguration",
    formConfiguration: Object.assign({}, FORM_DEFAULT_DATA),
    tempFormula: {},
    frm: false,
    frmConfig: false,
  }),
  mounted() {
    this.makeSelectDoctypeControl();
  },
  methods: {
    addFormula() {
      this.formConfiguration.formula.push(this.tempFormula);
      this.tempFormula = {};
    },
    removeFormula(formula) {
      const result = this.formConfiguration.formula.filter(
        (item) => item.name != formula.name
      );
      this.formConfiguration.formula = result;
    },

    makeSelectDoctypeControl() {
      let me = this;
      let customer_field = frappe.ui.form.make_control({
        df: {
          label: __("Reference"),
          fieldtype: "Link",
          fieldname: "reference",
          options: "DocType",
          placeholder: "Select doctype",
          onchange: function() {
            if (this.value) {
              me.formConfiguration.mappedDoctype = this.value;
            }
          },
        },
        parent: this.$refs["doctype"],
        render_input: true,
      });
      customer_field.toggle_label(false);
      customer_field.$input.val(me.formConfiguration.mappedDoctype);
      $("#modal-body")
        .find(".input-max-width")
        .removeClass("input-max-width");
    },
  
  },

  created() {
    // retrieve the data from `GlobalSidebar` passed in
    this.formConfiguration = Object.assign(
      {},
      this.formConfiguration,
      this.dataPackage
    );
  },
};
</script>

<style scoped></style>
