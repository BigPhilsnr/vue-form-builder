<template>
  <div>
    <b-form-datepicker
      :id="control.uniqueId"
      :value="value"
      @input="dataChanged"
      :show-decade-nav="true"
      today-button
      reset-button
      close-button
     
      locale="en"
    ></b-form-datepicker>
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
  name: "DateControl",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  methods: {
    dataChanged(val){
     this.updateValue(val)
    }
  },
};
</script>

<style scoped></style>
