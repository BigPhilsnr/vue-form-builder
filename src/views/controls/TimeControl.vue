<template>
  <div>
    <b-time
      :id="control.uniqueId"
     :value="value"
     @input="dataChanged"
      show-seconds
      :hour12="false"
      locale="en"
    >
      <div class="d-flex" dir="ltr">
        <b-button
          size="sm"
          variant="outline-danger"
          v-if="value"
          @click="clearTime"
        >
          Clear time
        </b-button>
        <b-button
          size="sm"
          variant="outline-primary"
          class="ml-auto"
          @click="setNow"
        >
          Set Now
        </b-button>
      </div>
    </b-time>
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
  name: "TimeControl",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  data() {
    return {
      searchValue: "",
    };
  },
 
  methods: {
    setNow() {
      const now = new Date();
      this.value = now.toTimeString().slice(0, 8);
    },
    clearTime() {
      this.value = "";
    },
     dataChanged(val){
     this.updateValue(val)
    }
  },
};
</script>

<style scoped></style>
