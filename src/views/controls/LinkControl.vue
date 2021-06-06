<template>
  <div>
    <input
      v-show="false"
      :id="control.uniqueId"
      type="text"
      :class="controlFieldClass"
      :value="value"
      :name="control.name || control.uniqueId"
      :placeholder="control.placeholderText"
    />
    <div
      ref="doctype"
      class="ref-field-input"
    >
    </div>
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
  name: "LinkControl",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  data() {
    return {
      searchValue: "",
    };
  },
 mounted() {
    this.makeSelectDoctypeControl();
 },
  methods: {
    makeSelectDoctypeControl() {
      let me = this;
      let customer_field = frappe.ui.form.make_control({
        df: {
          label: __("Reference"),
          fieldtype: "Link",
          fieldname: "reference",
          options: me.control.searchDocument,
          placeholder: me.control.placeholderText,
          onchange: function() {
            if (this.value) {
              me.updateValue(this.value)
            }
          },
        },
        parent: this.$refs["doctype"],
        render_input: true,
      });
      customer_field.toggle_label(false);
      customer_field.$input.val(me.value);
      $("#modal-body")
        .find(".input-max-width")
        .removeClass("input-max-width");
    },
  },
};
</script>

<style scoped></style>
