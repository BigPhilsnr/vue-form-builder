<template>
    <div>
        <div :class="styles.FORM.FORM_GROUP">
            <label>Concept Dictionary</label>
            <select type="text"
                    :class="styles.FORM.FORM_CONTROL"
                    v-model="control.buttonType"
            >
                <option v-for="item in buttonTypeList"
                        :key="item"
                        :value="item"
                        v-text="item">
                </option>
            </select>
        </div>
    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";

    export default {
        name: "ConceptDictionary",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN],

        computed: {
            buttonTypeList() {
                return ['button', 'submit', 'clear']
            },
            buttonClasses() {
                return this.styles.BUTTON
            }
        }
    }
</script>