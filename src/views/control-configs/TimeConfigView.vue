<template>
    <div>
        <div :class="styles.FORM.FORM_GROUP">
            <label>Hide header</label>
            <input type="checkbox"  :class="styles.FORM.FORM_CONTROL" v-model.number="control.hideHeader" />
        </div>

    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";

    export default {
        name: "TimeConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN]
    }
</script>