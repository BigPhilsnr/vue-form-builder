<template>
  <div>
   <button :id="control.uniqueId"
            :class="buttonClasses"
            :name="control.name"
            v-text="control.label"
            :type="control.buttonType || 'button'"
            @click="clickedHandle">
  
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
  name: "AttachmentControl",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  data() {
    return {
      searchValue: "",
    };
  },

  methods: {
  clickedHandle() {
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
