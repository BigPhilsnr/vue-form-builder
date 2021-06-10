<template>
  <div  :style="{  'min-height': ((control.height+130 )||330 ) + 'px' }">
    <vue-editor
      v-model="value"
      :id="control.uniqueId"
      type="text"
      :value="value"
      :name="control.name || control.uniqueId"
      :placeholder="control.placeholderText"
      :style="{  'min-height': (control.height ||200 ) + 'px' }"
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
