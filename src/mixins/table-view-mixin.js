/**
 * Base extendation for the Row-View - Form-Builder
 */
import {STYLE_INJECTION_MIXIN} from "@/mixins/style-injection-mixin";

const TABLE_VIEW_MIXIN = {
    mixins: [STYLE_INJECTION_MIXIN],

    props: {
        /**
         * Section that belong to the current row
         */
        section: {
            type: Object,
            required: true
        },
        readOnly:{
            type:Boolean,
            required:false,
            default:true
        }
    },


}
export {
    TABLE_VIEW_MIXIN
}