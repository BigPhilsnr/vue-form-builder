/**
 * Event-Communication Constants in Vue-Form-Builder
 * @author Phat Tran <phattranminh96@gmai.com>
 */

const EVENT_CONSTANTS = {
    /**
     * Constants for Form-Builder
     */
    BUILDER: {
        SECTION: {
            ADDED_ROW: "builder.section.added_row",
            DELETE: "builder.section.delete",
            UPDATE: "builder.section.update",

            // section sort
            PUSH: "builder.section.push"
        },


        ROW: {
            CREATE: "builder.row.create",
            UPDATE: "builder.row.update",
            DELETE: "builder.row.delete",
        },

        CONTROL: {
            CREATE: "builder.control.create",

            UPDATE: "builder.control.update",

            DELETE: "builder.control.delete",
            DELETED: "builder.control.deleted",

            SORT: "builder.control.delete",
        },

        /**
         * GLOBAL SIDEBAR EVENTS
         */
        SIDEBAR: {
            INJECT: "builder.sidebar.inject",
            OPEN: "builder.sidebar.open",
            OPENED: "builder.sidebar.opened",

            SAVE: "builder.sidebar.save",
            SAVE_AND_CLOSE: "builder.sidebar.save_and_close",

            AFTER_CLOSED: "builder.sidebar.after_closed",
        }
    },

    /**
     * Constants for Form-Renderer
     */
    RENDERER: {
        RUN_VALIDATION: "renderer.run_validation",
        VALIDATION_OK: "renderer.validation_ok"
    }
};

export {
    EVENT_CONSTANTS
}