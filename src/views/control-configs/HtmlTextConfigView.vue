<template>
    <div>
        <div :class="styles.FORM.FORM_GROUP">
            <label>Height  </label>
            <input type="number" step="1" :class="styles.FORM.FORM_CONTROL" v-model.number="control.height" />
            <small>`row` Height of the editor</small>
        </div>

    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";

    export default {
        name: "TextConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN]
    }
</script>