<template>
  <div class="sidebar-form-configuration">
    <h5>Section Configuration</h5>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Headline</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.headline"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Headline Additional Class (CSS)</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.headlineAdditionalClass"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Sub-Headline</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.subHeadline"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Sub-Headline Additional Class (CSS)</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.subHeadlineAdditionalClass"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>
        Show Section Headline?
        <input type="checkbox" v-model="sectionConfiguration.isShowHeadline" />
      </label>
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>
        Select Formula Controls </label>
        <select
          :class="controlFieldClass"
          @input="updateValue($event.target.value)"
        >
          <option
            v-for="optionObj in sectionConfiguration.controls"
            :key="optionObj"
            :value="optionObj"
            v-text="optionObj"
            :selected="value === optionObj"
          ></option>
        </select>
     
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Evaluation visibility</label>
      <textarea
        type="text"
        placeholder="Write your formula here"
        :class="styles.FORM.FORM_CONTROL"
        rows="6"
        v-model="sectionConfiguration.condition"
      />
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
import { SECTION_DEFAULT_DATA } from "@/configs/section";

export default {
  name: "SidebarSectionConfiguration",
  mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],

  data: () => ({
    dataKey: "sectionConfiguration",
    sectionConfiguration: Object.assign({}, SECTION_DEFAULT_DATA),
  }),

  created() {
    // retrieve the data from `GlobalSidebar` passed in
    this.sectionConfiguration = Object.assign(
      {},
      this.sectionConfiguration,
      this.dataPackage
    );
  },
  methods: {
    updateValue(val) {
      const value = this.sectionConfiguration.condition + "  " + `[${val}] `;
      this.$set(this.sectionConfiguration, "condition", value);
    },
  },
};
</script>
