/**
 * V-Model of Form-Renderer
 */
import { CONTROLS } from "@/configs/controls";

const EMIT_EVENT = "change";

const MODEL = {
  props: {
    value: Object,
  },
  model: {
    event: EMIT_EVENT,
    props: "value",
  },
  data: () => ({
    valueContainer: null,
  }),
  watch: {
    value: {
      deep: true,
      handler(val) {
        if (typeof val !== "object") {
          return;
        }

        const valx = this.executeAll(val);
        this.men(valx);
        this.controlDepends(valx)
        // set value for fields
        Object.assign(this.valueContainer, valx);
      },
    },

    valueContainer: {
      deep: true,
      handler(val) {
        if (!val) return;
        this.$emit(EMIT_EVENT, this.valueContainer);
      },
    },
  },

  methods: {

    executeAll(val) {
      if (!this.formData.formConfig.formula.length) {
        return val;
      }
    
      this.formData.formConfig.formula.forEach((formula) =>{
         val = this.executeFormalar(val, formula.formula, formula.output)
      } );

      return val;
    },
    men(val) {
      const sectionIds = Object.keys(this.formData.sections);
      sectionIds.forEach((sectionId) => {
        const section = this.formData.sections[sectionId];
        if (section.condition.length) {
          const shouldBeHidden = this.executeDependency(val, section.condition);
          if (shouldBeHidden) {
            section.controls.forEach((controlId) => {
              if (this.formData.controls[controlId].evaluatedVisibility) {
                const controlObj = this.formData.controls[controlId];
                controlObj.additionalContainerClass = controlObj.additionalContainerClass+" hide-me";
                console.log(controlObj);
                this.$set(this.formData.controls, controlId, controlObj);
              }
            });
          } else {
            section.controls.forEach((controlId) => {
              if (this.formData.controls[controlId].evaluatedVisibility) {
                const controlObj = this.formData.controls[controlId];
                controlObj.additionalContainerClass = controlObj.additionalContainerClass.replace(" hide-me","");
                console.log(controlObj);
                this.$set(this.formData.controls, controlId, controlObj);
              }
            });
          }
        }
      }); 
    },
    controlDepends(val) {
      const controlIds = Object.keys(this.formData.controls);
      controlIds.forEach((controlId) => {
        const control = this.formData.controls[controlId];
        if (control.hideCondition && control.hideCondition.length) {
          const shouldBeHidden = this.executeDependency(val, control.hideCondition);
          if (shouldBeHidden) {       
              const controlObj = this.formData.controls[controlId];
              controlObj.additionalContainerClass = controlObj.additionalContainerClass+" hide-me";
              console.log(controlObj);
              this.$set(this.formData.controls, controlId, controlObj);

          } else {
            const controlObj = this.formData.controls[controlId];
            controlObj.additionalContainerClass = controlObj.additionalContainerClass.replace(" hide-me","");
            console.log(controlObj);
            this.$set(this.formData.controls, controlId, controlObj);
          }
        }
      });

      
    },
    createValueContainer() {
      let containerObj = {};
      const controlIds = Object.keys(this.formData.controls);

      controlIds.forEach((controlId) => {
        const controlItem = this.formData.controls[controlId];

        // if disableValue is provided, we don't need to solve more for the control
        if (
          typeof CONTROLS[controlItem.type].disableValue === "boolean" &&
          CONTROLS[controlItem.type].disableValue
        ) {
          return;
        }

        // get the key-name value
        let name = controlItem.name;
        if (!name) {
          // fall-back to id if no name
          name = controlId;
        }

        // add new empty field value
        containerObj[name] = "";

        // if the control has default factory creation closure, run it
        if (
          typeof CONTROLS[controlItem.type].rendererDefaultData === "function"
        ) {
          containerObj[name] = CONTROLS[controlItem.type].rendererDefaultData(
            controlItem
          );
        }
      });

      // emit to the parent for the value detail
      if (this.value) {
        this.$emit(EMIT_EVENT, containerObj);
      }

      // set to the real handler
      this.valueContainer = containerObj;
    },

    executeDependency(input, str) {
      let shouldBeHidden = false;
      const matches = str.match(/\[[^\]]*]/g);
      console.log("MATCHES", matches);
      let hasFailed = false;

      matches.forEach((match) => {
        const key = match.replace("[", "").replace("]", "");
        let keyValue = input[`${key}`];
        if (!keyValue) {
          hasFailed = true;
        }
        if (isNaN(keyValue)) {
          str = str.replace(match, `input['${key}']`);
        } else {
          str = str.replace(match, keyValue);
        }
      });

      if (!hasFailed) {
        console.log(str);
        shouldBeHidden = eval(str);
      }

      console.log(str);
      return shouldBeHidden;
    },

    executeFormalar(input, str, output) {
      if (!str) {
        return input;
      }
      let shouldBeHidden = false;
      const matches = str.match(/\[[^\]]*]/g);
      console.log("MATCHES", matches);
      let hasFailed = false;

      matches.forEach((match) => {
        const key = match.replace("[", "").replace("]", "");
        let keyValue = input[`${key}`];
        if (!keyValue) {
          hasFailed = true;
        }
        if (isNaN(keyValue)) {
          str = str.replace(match, `input['${key}']`);
        } else {
          str = str.replace(match, keyValue);
        }
      });

      if (!hasFailed) {
        console.log(str)
        input[output] = eval(str);
      }

      return input;
    },
  },

  created() {
    this.createValueContainer();
  },
};

export { MODEL };
