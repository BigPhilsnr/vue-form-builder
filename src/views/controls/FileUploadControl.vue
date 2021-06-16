<template>
  <div>
   <button :id="control.uniqueId"
            :class="buttonClasses"
            :name="control.name"
            v-text="control.label"
            :type="control.buttonType || 'button'"
            @click="uploadFile()">
  
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
  name: "FileUploadControl",
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
     uploadFile() {
      const me = this;
      new frappe.ui.FileUploaderCustom({
        doctype: "Mtrh Forms Repository",
        docname: me.parentId,
        on_success(file_doc) {      
          const { file_url, filename } = file_doc;
          me.updateValue(file_url)
        },
      });

    }
  },
};
</script>

<style scoped></style>
