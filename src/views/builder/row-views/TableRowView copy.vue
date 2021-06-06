<template>
 <div>
     <div> <b-table striped hover :items="items"/></div>
     <div>
            <tr :class="['table-row-block', styles.TABLE.TR_CLASS]">
        <td>
            <AddControlControl :section="this.section" />
        </td>
       
    </tr>
     </div>
 </div>
</template>

<script>
    import {ROW_VIEW_MIXIN} from "@/mixins/row-view-mixin";
    import AddControlControl from "@/views/builder/add-controls/AddControlControl";
  
    export default {
        name: "TableRowView",
        components: {AddControlControl},
        mixins: [ROW_VIEW_MIXIN],
         data() {
          return {
                items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
          }
      },
    }


</script>

<style scoped>

</style>