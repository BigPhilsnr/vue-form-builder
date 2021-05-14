<template>
    <SidebarToggleableContainer headline="Validation">

        <label>
            Formula
            <span class="pointer"
                  title="Click this to add a new rule"
                  @click="addNewFormula"
                  v-html="$form.getIcon('addOutline', '16px', '16px', 'green')">
            </span>
        </label>

        <div class="list-selection"
             v-for="(addedFormula, ruleIndex) in control.validations"
             :key="addedFormula.name">

            <div class="tool-block">
                <span class="pointer"
                      title="Click this to remove this rule"
                      @click="removeFormula(ruleIndex)"
                      v-html="$form.getIcon('close', '16px', '16px', 'red')">
                </span>
            </div>

            <div :class="styles.FORM.FORM_GROUP">

                <label>name</label>
                <input type="text"
                       :class="styles.FORM.FORM_CONTROL"
                       v-model="addedFormula.errorMessage">

            </div>
        </div>

    </SidebarToggleableContainer>
</template>

<script>
    import SidebarToggleableContainer from "@/views/container-views/SidebarToggleableContainer";
    import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";
    import {FormFormula } from "@/configs/formula";

    export default {
        name: "ControlValidationInformation",
        mixins: [STYLE_INJECTION_MIXIN],
        components: {SidebarToggleableContainer},
        props: {
            control: Object
        },

        methods: {
          
          
            updateDefaultErrorMessage(addedFormula) {
                addedFormula.errorMessage = this.getFormulaInfo(addedFormula.ruleType, 'errorMessage')
            },

        
            addNewFormula() {
                this.control.validations.push(new FormFormula());
            },

            removeFormula(index) {
                this.control.validations.splice(index, 1)
            },
           
        },
    }
</script>