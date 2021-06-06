<template>
  <div>
    <vue-editor
      v-model="value"
      :id="control.uniqueId"
      type="text"
      :value="value"
      :rows="control.rows"
      :name="control.name || control.uniqueId"
      :placeholder="control.placeholderText"
    />
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";

import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
  name: "HtlmTextControl",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  components: {
    VueEditor,
  },
  watch:{
      value(val){
          updateValue(val)
      }
  }
};
</script>

<style scoped></style>
